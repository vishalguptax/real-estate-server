import ErrorResponse from "../helpers/errorResponse.js"
import SuccessResponse from "../helpers/successResponse.js"
import { prisma } from "./../prisma/index.js"

/**
 * getPosts                 - It is used to get the all posts
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const getPosts =async(req,res)=>{

    try{
        const posts = await prisma.post.findMany()
        console.log(posts)
      
        return SuccessResponse.ok({res,meassage:"all posts",posts})
    }catch(error){
        console.log(error)
     
        return ErrorResponse.internalServer({res, message:"can't reterive all posts"})
    };
    
}

/**
 * getPost                 - It is used to get a particullar post by id
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const getPost =async(req,res)=>{

    try{

        const {id}=req.params.id;
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
            return ErrorResponse.notFound({res,message: "Post not found" })
        }
        return SuccessResponse.ok({res,meassage:"find a post",post})
    }catch(error){
        return ErrorResponse.internalServer({res, message:"can't reterive the posts"})
  
    }  
};

/**
 * addPosts                 - It is used to add/create the new post
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */


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
        //res.status(200).json(newPost);
        return SuccessResponse.ok({res,meassage:"new post created successfully",newPost})

    }catch(error){
        console.log(error)
        //res.status(500).json({message:error})
        return ErrorResponse.internalServer({res, message:"can't create new posts"})

    }; 
}
/**
 * updatePost               - It is used to update a particular post
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

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
          return ErrorResponse.notFound({res,message: "Post not found" })

        }        
        if (existingPost.userId !== tokenUserId) {
           return ErrorResponse.forbidden({res,message: "Unauthorized to update this post" })

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

        return SuccessResponse.ok({res,meassage:" post updated successfully",updatePost})
        
    } catch (err) {
        console.log(err);
        return ErrorResponse.internalServer({res, message:"can't update posts"})

    }
};


/**
 * deletePost               - It is used to delete a particular posts
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
  
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: { postDetail: true },
      });
  
      if (post.userId !== tokenUserId) {
        //return res.status(403).json({ message: "Not Authorized!" });
        return ErrorResponse.forbidden({res,message: "Unauthorized to delete this post" })

      }

      if (post.postDetail) {
        await prisma.postDetail.delete({
            where: { id: post.postDetail.id },
        });
        }
  
      await prisma.post.delete({
        where: { id },
      });
  
      //res.status(200).json({ message: "Post deleted" });
      return SuccessResponse.ok({res,meassage:" post deleted successfully"})

    } catch (err) {
      console.log(err);
     // res.status(500).json({ message: "Failed to delete post" });
     return ErrorResponse.internalServer({res, message:"can't delete posts"})

    }
  };

