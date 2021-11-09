import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
    const [task, setTask] = useState('');
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch('http://localhost:8000/blogs/', { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch the data');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setIsError(null);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                    console.log(abortCont.signal);
                } else {
                    setIsError(err.message);
                    setIsPending(false);
                }
            });
        return () => abortCont.abort();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tasks = { task };
        console.log(tasks);
        fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks),
        }).then(() => {
            console.log('new task added');
        });
    };

    return (
        <div className='home'>
            {isError && <div>{isError}</div>}
            {isPending && <div>Loading...</div>}
            {data && (
                <>
                    <div className='task'>
                        <h2>All Task</h2>
                        <div className='list-form'>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    required
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                                <button>Post</button>
                            </form>
                        </div>
                    </div>
                    <BlogList blogs={data} />
                </>
            )}
        </div>
    );
};

export default Home;
