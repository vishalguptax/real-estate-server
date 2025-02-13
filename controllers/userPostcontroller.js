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
        const postId=parseInt(id)
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
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
        
        return res.status(200).json(post)
       
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




export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const tokenUserId = req.userId;

        // Find the existing post
        const existingPost = await prisma.post.findUnique({
            where: { id } // Keep id as a string if it's stored as a string in DB
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Ensure the user updating the post is the owner
        if (existingPost.userId !== tokenUserId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        // Update the post
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...body.postData,
                post: {
                    update: body.post,
                },
            },
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};




// export const updatePost =async(req,res)=>{

//      try {
//           res.status(200).json({message:"updatePost successfully"});
//         } catch (err) {
//           console.log(err);
//           res.status(500).json({ message: "Failed to update posts" });
//         }
//       };


