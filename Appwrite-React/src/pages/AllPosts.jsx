import React, { useEffect, useState } from 'react';
import appwriteService from '../Appwrite/config';
import { Container, PostCard } from '../components';

function AllPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getAllPosts()
            .then((response) => {
                console.log("ALL POSTS RESPONSE:", response);

                if (response) {
                    setPosts(response.documents || []);
                }
            })
            .catch((error) => {
                console.log("ERROR FETCHING POSTS:", error);
                setPosts([]);
            });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>

                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <h1 className="text-3xl font-bold mb-4">
                            No posts available
                        </h1>

                        <p className="text-gray-600">
                            There are currently no posts.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="p-2 w-full sm:w-1/2 lg:w-1/4"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}

            </Container>
        </div>
    );
}

export default AllPosts;