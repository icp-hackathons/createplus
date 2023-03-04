import React, { useState, useEffect } from 'react'

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
const Profile = () => {

  return (

     <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Forum</h1>
      </div>

      <form onSubmit="" className="w-full mt-[65px] flex flex-col gap-[30px]">


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

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Send"
              styles="bg-[#1dc071]"
            />
            <div></div>


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