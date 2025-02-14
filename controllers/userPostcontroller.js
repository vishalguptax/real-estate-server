import { prisma } from "./../prisma/index.js"


// to get all posts
export const getPosts =async(req,res)=>{

    try{
        const posts = await prisma.post.findMany()
        console.log(posts)
        res.status(200).json(posts)
    }catch(error){
        console.log(error)

        res.status(500).json({message:error})

    };
    
}


// get post by id
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

// to add or create new post

export const addPosts =async(req,res)=>{

    try{

        const body =req.body;
        const tokenUserId = req.userId;
        const newPost =await prisma.post.create({
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail,
                },
                
            },
        });
        res.status(200).json(newPost);
    }catch(error){
        console.log(error)

        res.status(500).json({message:error})

    };
    
}

// to update post content
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const tokenUserId = req.userId;

        // Find the existing post
        const existingPost = await prisma.post.findUnique({
            where: { id } 
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        
        if (existingPost.userId !== tokenUserId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

    
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

// to delete the post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
  
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: { postDetail: true },
      });
  
      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
      }

      if (post.postDetail) {
        await prisma.postDetail.delete({
            where: { id: post.postDetail.id },
        });
        }
  
      await prisma.post.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
    }
  };

