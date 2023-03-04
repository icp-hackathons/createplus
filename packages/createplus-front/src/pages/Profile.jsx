import React, { useState, useEffect } from 'react'
import { useCallback, useContext } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import {
  FollowOnLens
} from '@lens-protocol/widgets-react'

import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-react'

import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Router from 'next/router';
import { TextField, CallToAction } from '@magiclabs/ui';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      // Grab auth token after user clicks magic link in email
      const didToken = await magic.auth.loginWithMagicLink({ email });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      if (res.status === 200) {
        setUser(await magic.user.getMetadata());
        Router.push('/');
      }
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const loginWithTwitter = async () => {
    await magic.oauth.loginWithRedirect({
      provider: 'twitter',
      redirectURI: `${window.location.origin}/callback`,
    });
  };

  return (

     <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[18px] text-[18px] leading-[18px] text-white">Forum</h1>
      </div>

      <form onSubmit="" className="w-full mt-[35px] flex flex-col gap-[10px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value=""
          />
        </div>

        <FormField
            labelName="Story *"
            placeholder="Write your story"
          inputType="text"
          value=""
          />
        <div className=''>

          <div className="col-span-1 flex justify-center items-center mt-[20px] flex-row px-1">
            <div className="login-container">
              <h1 className='text-white'>Sign up / Log in</h1>
              <TextField
                type="email"
                name="email"
                required="required"
                placeholder="Enter your email"
                onChange={handleInputOnChange}
                disabled={isLoggingIn}
              />
              <CallToAction
                color="primary"
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}

              >
                Send Magic Link
              </CallToAction>
              <div className="or-login-with">Or Log in With</div>
              <div onClick={loginWithTwitter}>
                <img src="/twitter.png" height={45} className="twitter-img" />
              </div>
              <style>{`
        h1 {
          font-size: 20px;
          font-weight: bold;
        }
        .login-container {
          width: 280px;
          height: 280px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #f9f9f9;
          box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .twitter-img {
          border-radius: 50%;
          border: 1px solid #fbfbfb;
          cursor: pointer;
        }

        .twitter-img:hover {
          box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 16px;
        }

        .or-login-with {
          color: gray;
          font-size: 12px;
        }
      `}</style>
            </div>
          </div>

        </div>

        <div className=" flex justify-center items-center mt-[10px]">
          <ShareToLens className=" justify-center gap-4 text-center "
            content="I love Create+"
          />
        </div>
      </form>
      <div>
        <div className=" mt-[40px] w-full flex-auto justify-start items-center p-4 bg-[#3a3a43]  h-[120px] rounded-[10px]">

          <h4 className="font-epilogue font-bold   text-white ml-[20px]">Alan:</h4>
          <h4 className="font-epilogue  text-white ml-[20px]">Have you seen the last trailer?</h4>
          <FollowOnLens
            handle="Alan"
          />
        </div>
        <div className=" mt-[40px] w-full flex-grow justify-start items-center p-4 bg-[#3a3a43]  h-[120px] rounded-[10px]">

          <h4 className="font-epilogue font-bold   text-white ml-[20px]">Maggie:</h4>
          <h4 className="font-epilogue  text-white ml-[20px]">not yet</h4>
          <FollowOnLens
            handle="Maggie"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile