'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react'; // to know whose user is currently logged in
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import { RouteHandlerManager } from 'next/dist/server/future/route-handler-managers/route-handler-manager';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const response = await fetch('/api/prompt/new', 
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        } )

        // router.push('/');
        if(response.ok){
          router.push('/profile');
        }
      } catch (error) {
        console.log(error);
      }finally{
        setSubmitting(false);
      }
    }

  return (
    <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt