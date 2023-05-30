import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    // console.log("Here are the ",params)
  try {
    await connectToDB();

    const prompts = await Prompt.find({
        creator: params.id
    }).populate("creator");

    // console.log("HERE ARE THE LIST!!! ",JSON.stringify(prompts));

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
    
  } catch (error) {
    return new Response("failed to fetch all", {
      status: 500,
    });
  }
};
