import { useEffect, useState } from "react";
import { Button, Table, message, Form, Modal, Input, List, Space } from "antd";
import { callGetCourses } from "../util/api";
import type { ICourse, IMeta, INote } from "../types/backend";

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

    const fetchCourses = async (page = 1) => {
        try {
            const res = await callGetCourses(page, meta.pageSize);
            if (res?.data?.result) {
                setCourses(res.data.result);
                setMeta(res.data.meta);
            } else {
                message.error("Không có dữ liệu khóa học");
            }
        } catch (err) {
            console.error(err);
            message.error("Không thể tải danh sách khóa học");
        }
    };

    useEffect(() => {
        fetchCourses(meta.current);
    }, []);

    const handleOpenNotes = (course: ICourse) => {
        setSelectedCourse(course);
        setIsNoteModalOpen(true);
        setNotes([
            {
                id: 1,
                title: "Ghi chú 1",
                content: "Nội dung ghi chú đầu tiên của " + course.name,
                imageUrl: "",
            },
            {
                id: 2,
                title: "Ghi chú 2",
                content: "Nội dung ghi chú thứ hai của " + course.name,
                imageUrl: "",
            },
        ]);
    };
    
    const handleAddNote = () => {
        form.validateFields().then((values) => {
            const newNote: INote = {
                id: Date.now(),
                title: values.title,
                content: values.content,
                imageUrl: "",
            };
            setNotes((prev) => [...prev, newNote]);
            form.resetFields();
        });
    };

    const handleEditNote = (id: number) => {
        const note = notes.find((n) => n.id === id);
        if (!note) return;
        const newTitle = prompt("Sửa tiêu đề ghi chú:", note.title);
        const newContent = prompt("Sửa nội dung ghi chú:", note.content);
        if (newTitle || newContent) {
        setNotes((prev) =>
            prev.map((n) =>
                n.id === id
                    ? {
                        ...n,
                        title: newTitle ?? n.title,
                        content: newContent ?? n.content,
                    }
                : n
                )
            );
        }
    };

    const handleDeleteNote = (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const handleAddImage = (id: number) => {
        message.info(`Thêm ảnh cho ghi chú ID ${id}`);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên khóa học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
        title: "Hành động",
        key: "action",
        render: (_: any, record: ICourse) => (
            <Button
                type="default"
                onClick={() => handleOpenNotes(record)}
            >
                Ghi chú
            </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={courses}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    onChange: (page) => fetchCourses(page),
                }}
            />

            <Modal
                open={isNoteModalOpen}
                title={`Ghi chú cho khóa học: ${selectedCourse?.name}`}
                onCancel={() => setIsNoteModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="inline" onFinish={handleAddNote}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: "Nhập tiêu đề ghi chú" }]}
                    >
                        <Input placeholder="Tiêu đề ghi chú" style={{ width: 180 }} />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: "Nhập nội dung ghi chú" }]}
                    >
                        <Input placeholder="Nội dung ghi chú" style={{ width: 220 }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={handleAddNote} style={{ marginTop: 12}}>
                            Thêm ghi chú
                        </Button>
                    </Form.Item>
                </Form>

                <List
                    style={{ marginTop: 16 }}
                    bordered
                    dataSource={notes}
                    renderItem={(note) => (
                        <List.Item
                            actions={[
                                <Button size="small" onClick={() => handleEditNote(note.id)}>
                                    Sửa
                                </Button>,
                                <Button
                                    size="small"
                                    danger
                                    onClick={() => handleDeleteNote(note.id)}
                                >
                                    Xóa
                                </Button>,
                                <Button size="small" onClick={() => handleAddImage(note.id)}>
                                    Thêm ảnh
                                </Button>,
                            ]}
                        >
                        <Space direction="vertical">
                            <strong>{note.title}</strong>
                            <span>{note.content}</span>
                        </Space>
                    </List.Item>
                )}
            />
        </Modal>
        </>
    );
};

export default Home;
