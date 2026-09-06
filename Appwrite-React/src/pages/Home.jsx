import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import appwriteService from '../Appwrite/config';
import { Container, PostCard } from '../components';

function Home() {

    const [posts, setPosts] = useState([]);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getAllPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents || []);
                }
            })
            .catch((error) => {
                console.log("Error fetching posts:", error);
                setPosts([]);
            });
    }, []);

    if (!authStatus) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">
                            Login to read posts
                        </h1>

                        <p className="text-gray-600">
                            Please login to view posts.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">
                            No posts available
                        </h1>

                        <p className="text-gray-600">
                            There are currently no active posts.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-1/4"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;