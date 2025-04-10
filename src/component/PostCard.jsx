import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

// function PostCard({ $id, title, featuredImage }) {
//     return (
//         <Link to={`/post/${$id}`}>
//             <div className='w-full bg-gray-100 rounded-xl p-4'>
//                 <div className='w-full justify-center mb-4'>
//                     <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                         className='rounded-xl'
//                     />

//                 </div>
//                 <h2
//                     className='text-xl font-bold'
//                 >{title}</h2>
//                 <h1>Read More</h1>
//             </div>
//         </Link>

//     )
// }

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                        className='rounded-xl'
                    /> */}

                    <img
                        src={featuredimage ? appwriteService.getFilePreview(featuredimage) : 'https://via.placeholder.com/400x300'}
                        alt={title}
                        className="rounded-xl"
                        onError={(e) => {
                            // Prevent infinite loops if the fallback also fails
                            if (!e.target.src.includes('placeholder')) {
                                console.error("Image failed to load:", e.target.src);
                                e.target.src = 'https://via.placeholder.com/400x300';
                            }
                        }}
                    />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
                <h1>Read More</h1>
            </div>
        </Link>
    )
}

export default PostCard
