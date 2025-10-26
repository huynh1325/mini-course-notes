import { useEffect, useState } from "react";
import { Button, Table, Form, Modal, Input, List, Space, Upload } from "antd";
import { callGetCourses, callCreateNote, callGetNotesByCourse, callDeleteNote, callUpdateNote } from "../util/api";
import type { ICourse, IMeta, INote } from "../types/backend";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";

const Home = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [meta, setMeta] = useState<IMeta>({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [notes, setNotes] = useState<INote[]>([]);
    const [form] = Form.useForm();
    const [uploadImageUrl, setUploadImageUrl] = useState<string>("");
    const [editImageUrl, setEditImageUrl] = useState<string>("");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<INote | null>(null);
    const [editForm] = Form.useForm();

    const fetchCourses = async (page = 1) => {
        try {
            const res = await callGetCourses(page, meta.pageSize);
            if (res?.data?.result) {
                setCourses(res.data.result);
                setMeta(res.data.meta);
            } else {
                toast.error("Không có dữ liệu khóa học");
            }
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải danh sách khóa học");
        }
    };

    useEffect(() => {
        fetchCourses(meta.current);
    }, []);

    const fetchNotes = async (courseId: number) => {
        try {
            const res = await callGetNotesByCourse(courseId);
            if (res?.data) {
                setNotes(res.data);
            } else {
                setNotes([]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải ghi chú");
        }
    };

    const handleOpenNotes = (course: ICourse) => {
        setSelectedCourse(course);
        setIsNoteModalOpen(true);
        fetchNotes(course.id);
    };

    const handleAddNote = async () => {
        if (!selectedCourse) return;
        try {
            const values = await form.validateFields();
            const title = values.title?.toString().trim() || "";
            const content = values.content?.toString().trim() || "";
            const imageUrl = uploadImageUrl || "";

            const res = await callCreateNote({
                title,
                content,
                userId: 1,
                courseId: selectedCourse.id,
                imageUrl,
            });
            if (!res.data) {
                toast.error(res.message || "Thêm ghi chú thất bại");
                return;
            }
            setNotes(prev => [...prev, res.data]);
            form.resetFields();
            toast.success(res.message || "Thêm ghi chú thành công");
            setUploadImageUrl("");
        } catch (err: any) {
            console.error(err);
            toast.error("Lỗi từ server");
        }
    };

    const openEditModal = (note: INote) => {
        setEditingNote(note);
        editForm.setFieldsValue({
            title: note.title,
            content: note.content,
            imageUrl: note.imageUrl || "",
        });
        setIsEditModalOpen(true);
    };

    const handleEditNote = async () => {
        if (!editingNote) return;

        try {
            const values = await editForm.validateFields();
            const title = values.title?.toString().trim() || editingNote.title;
            const content = values.content?.toString().trim() || editingNote.content;
            const imageUrl = editImageUrl || editingNote.imageUrl;

            const res = await callUpdateNote(
                editingNote.id,
                title,
                content,
                imageUrl,
            );

            if (!res.data) {
                toast.error(res.message || "Cập nhật ghi chú thất bại");
                return;
            }

            setNotes(prev => prev.map(n => n.id === editingNote.id ? res.data! : n));
            setIsEditModalOpen(false);
            setEditImageUrl("");
            setEditingNote(null);
            toast.success(res.message || "Cập nhật ghi chú thành công");
        } catch (err) {
            console.error(err);
            toast.error("Cập nhật ghi chú thất bại");
        }
    };

    const handleDeleteNote = async (id: number) => {
        try {
            await callDeleteNote(id);
            setNotes(prev => prev.filter(n => n.id !== id));
            toast.success(res.message || "Xóa ghi chú thành công")
        } catch (err) {
            console.error(err);
            toast.error("Xóa ghi chú thất bại");
        }
    };

    return (
        <>
            <Table
                dataSource={courses}
                columns={[
                    { title: "ID", dataIndex: "id", key: "id" },
                    { title: "Tên khóa học", dataIndex: "name", key: "name" },
                    { title: "Mô tả", dataIndex: "description", key: "description" },
                    {
                        title: "Hành động",
                        key: "action",
                        render: (_: any, record: ICourse) => (
                            <Button type="default" onClick={() => handleOpenNotes(record)}>
                                Ghi chú
                            </Button>
                        ),
                    },
                ]}
                rowKey="id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    onChange: page => fetchCourses(page),
                }}
            />

            <Modal
                open={isNoteModalOpen}
                title={`Ghi chú cho khóa học: ${selectedCourse?.name}`}
                onCancel={() => setIsNoteModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="inline" onFinish={handleAddNote}>
                    <Form.Item name="title" rules={[{ required: true, message: "Nhập tiêu đề ghi chú" }]}>
                        <Input placeholder="Tiêu đề ghi chú" style={{ width: 180 }} />
                    </Form.Item>
                    <Form.Item name="content" rules={[{ required: true, message: "Nhập nội dung ghi chú" }]}>
                        <Input placeholder="Nội dung ghi chú" style={{ width: 220 }} />
                    </Form.Item>
                    <Form.Item label="Ảnh mô tả" name="imageUrl" valuePropName="fileList" getValueFromEvent={() => null}>
                        <Upload
                            beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setUploadImageUrl(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                                return false;
                            }}
                            maxCount={1}
                            showUploadList={true}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                        {uploadImageUrl && (
                            <img
                                src={uploadImageUrl}
                                alt="preview"
                                style={{ width: 100, marginTop: 8, borderRadius: 6 }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleAddNote} style={{ marginTop: 12 }}>Thêm ghi chú</Button>
                    </Form.Item>
                </Form>

                <List
                    style={{ marginTop: 16 }}
                    bordered
                    dataSource={notes || []}
                    renderItem={(note) => (
                        <List.Item
                            key={note.id}
                            actions={[
                                <Button size="small" onClick={() => openEditModal(note)}>Sửa</Button>,
                                <Button size="small" danger onClick={() => handleDeleteNote(note.id)}>Xóa</Button>,
                            ]}
                        >
                            <Space direction="vertical">
                                <strong>{note.title}</strong>
                                <span>{note.content}</span>
                                {note.imageUrl && (
                                    <img
                                        src={note.imageUrl}
                                        alt="note"
                                        style={{ width: 100, borderRadius: 6 }}
                                    />
                                )}
                            </Space>
                        </List.Item>
                    )}
                />
            </Modal>

            <Modal
                open={isEditModalOpen}
                title="Sửa ghi chú"
                onCancel={() => setIsEditModalOpen(false)}
                onOk={handleEditNote}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: "Nhập tiêu đề ghi chú" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: "Nhập nội dung ghi chú" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Ảnh mô tả" name="imageUrl" valuePropName="fileList" getValueFromEvent={() => null}>
                        <Upload
                            beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setEditImageUrl(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                                return false;
                            }}
                            maxCount={1}
                            showUploadList={true}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                        </Upload>
                        {(editImageUrl || editingNote?.imageUrl) && (
                            <img
                                src={editImageUrl || editingNote?.imageUrl}
                                alt="preview"
                                style={{ width: 100, marginTop: 8, borderRadius: 6 }}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Home;
