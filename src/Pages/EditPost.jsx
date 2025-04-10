import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../component'
import appwriteService from '../appwrite/config'

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if (post) {
                setPosts(post)
            }
            else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    return post ? (
        <div className='px-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
