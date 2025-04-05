import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../component'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        // query is an array
        appwriteService.getPosts([])
            .then((post) => {
                if (post) {
                    setPosts(post.documents)
                }
            })
    }, [])

    return (
        <div className='w-full px-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
