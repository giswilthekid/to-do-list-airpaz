import { useState } from 'react';

const BlogList = ({ blogs }) => {
    const [updateId, setUpdateId] = useState(null);
    const [task, setTask] = useState('');

    const handleDelete = (id) => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE',
        }).then(() => {
            console.log('deleted');
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const tasks = { task };
        console.log(tasks);
        fetch('http://localhost:8000/blogs/' + updateId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks),
        }).then(() => {
            console.log('new task added');
            setUpdateId(null);
        });
    };

    return (
        <div className='blog-list'>
            {blogs.map((blog) => (
                <div className='blog-preview' key={blog.id}>
                    <div className='task-header'>
                        <h2>{blog.task}</h2>
                    </div>
                    <div className='task-options'>
                        {blog.id === updateId ? (
                            <>
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type='text'
                                        required
                                        value={task}
                                        onChange={(e) =>
                                            setTask(e.target.value)
                                        }
                                    />
                                    <button>Post</button>
                                </form>
                                <button onClick={() => setUpdateId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className='update-button'
                                    onClick={() => setUpdateId(blog.id)}>
                                    Update
                                </button>
                                <button onClick={() => handleDelete(blog.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
