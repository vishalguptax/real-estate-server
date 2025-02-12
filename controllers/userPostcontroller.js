import { prisma } from "./../prisma/index.js"

export const getPosts =async(req,res)=>{

    try{
        const posts =await prisma.post.findMany()
        res.status(200).json(posts)
    }catch(error){
        console.log(error)

        res.status(500).json({message:"Failed to get posts"})

    };
    
}





export const getPost =async(req,res)=>{

    try{

        const {id}=req.params;
        const postId=parseInt(id)//extrecting id
        const post =await prisma.post.findUnique({
            where:{id:postId},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true,
                        avatar:true,
                    },
                },
            },
        });
        // if (!post) {
        //     return res.status(404).json({ message: "Post not found" });
        // }
        // res.status(200).json(post);
        
        return res.status(200).json(post)
        // const token =req.cookies?.token;
        // if (token){
        //     JsonWebTokenError.verify(token,process.env.JWT_SECRET_KEY,async(error,payload)=>
        //     {
        //         if(!error){
        //             const saved =await prisma.savedPost.findUnique({
        //                where:{ 
        //                 userId_postId:{
        //                     postId:id,
        //                     userId:payload.id,
        //                     },
                        
        //                 },
                    
        //             });
        //             res.status(200).json({...post,isSaved:saved ? true : false});

        //         }
        //     });
        // }
        // res.status(200).json({...post,isSaved:false});
    }catch(error){
  
        res.status(500).json({message:error})

    }
    
};






export const addPosts =async(req,res)=>{
    const body =req.body;
    const tokenUserId = req.userId;

    try{
        const newPost =await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                // postdetails
                postDetail:{
                    create:body.postDetail,

                },
            },
        });
        res.status(200).json(newPost);
    }catch(error){
        console.log(error)

        res.status(500).json({message:"Failed to create post"})

    };
    
}








export const updatePost =async(req,res)=>{

    try{
        res.status(200).json({message:"Updated"})
    }catch(error){
        console.log(error)

        res.status(500).json({message:"Failed to update posts"})

    };
    
}



// export const deletePosts =async(req,res)=>{
//     const id=req.params.id;
//     const tokenUserId =req.userId


//     try{
//         const post =await prisma.post.findUnique({
//             where:{id:id},
//         })
//         if(!post){
//             return res.status(404).json({message:"Post not found"});
//         }
//         if(post.userId!==tokenUserId){
//             return res.status(403).json({message:"Not Authorized!"})
//         };
//         await prisma.post.delete({message:"Post deleted"})
//         res.status(200).json()
//     }catch(error){
//         console.log(error)

//         res.status(500).json({message:"Failed to delete posts"})

//     };
    
// }