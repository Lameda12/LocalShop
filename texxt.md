# tactiq.io free youtube transcript
# Build This iOS App With Cursor AI (7 Tips From Me)
# https://www.youtube.com/watch/EamJfZHxiZw

00:00:00.160 Look at my super cute AI powered voice
00:00:02.800 note app. It is super fun nowadays and
00:00:05.839 anybody can make an AI powered app just
00:00:08.720 like I have. And what if I tell you that
00:00:10.639 you can actually do this in a day? Today
00:00:12.480 I'm going to give you my process of how
00:00:14.400 to build this entire app using cursor.
00:00:17.600 And I'm also going to give you some
00:00:19.279 really useful tips so that you can
00:00:21.279 easily build your very own AI powered
00:00:23.920 voice note app.
00:00:26.240 I'm somebody with a lot of ideas and my
00:00:28.960 brain is always on. I find that writing
00:00:31.519 things down or typing it out really
00:00:33.760 calms me down, but I'm older now. You
00:00:36.320 got to watch out for that carpal tunnel.
00:00:38.399 Also, sometimes I will be on the road
00:00:40.239 and you can't really bust out a notebook
00:00:42.079 then, right? So, a voice note
00:00:44.079 takingaking app would be really useful.
00:00:45.760 And recently, I saw a lot of these AI
00:00:47.760 voice note-taking or voice journaling
00:00:50.079 app on the iOS app store, but they all
00:00:53.120 charge like a monthly fee. So, I didn't
00:00:54.960 really want to pay for it, so I decided
00:00:56.640 to make my own, and you can, too. This
00:00:58.879 video will be broken down into three
00:01:00.719 parts. The first part of why is it's so
00:01:03.680 easy nowadays to make such an AI powered
00:01:06.479 voice note app. Number two is what tools
00:01:08.960 I'm going to use to make this app today.
00:01:11.119 And number three, it's hands-on time
00:01:12.799 where we get to make this app happen
00:01:16.439 together. I'm sure you notice a lot more
00:01:19.200 AI apps surfacing where you can talk to
00:01:22.560 an AI or whatnot. And part of this is
00:01:25.040 made possible by OpenAI who came out
00:01:27.439 with whisper. Whisper is an ML model
00:01:30.479 designed for speech recognition and
00:01:32.400 transcription. So the backstory is that
00:01:34.640 back in 2021, OpenAI were desperate for
00:01:37.840 training data and they wanted to use
00:01:39.840 YouTube videos and podcast to train
00:01:42.479 their LLMs. But to do that, they needed
00:01:44.880 highquality audio transcription. So
00:01:47.280 that's why they built Whisper. It was
00:01:49.280 released as open-source software in
00:01:52.079 2022. Whisper is great because it
00:01:54.079 supports a ton of languages. It's really
00:01:56.479 reliable. It's accurate and it does
00:01:59.119 really well even in noisy environments.
00:02:01.040 You could be in cafes talking and
00:02:03.280 Whisper will still do a really good job
00:02:05.040 of transcribing what you said. So why is
00:02:07.520 this relevant for us, right? Well,
00:02:09.679 because that's exactly what we'll be
00:02:11.520 using. OpenAI actually came out with an
00:02:13.760 API. So then it's easier for developer
00:02:16.480 now more than ever to incorporate this
00:02:18.800 technology into your app. And the
00:02:20.959 pricing of this is 0.0. 006 per minute
00:02:24.080 of audio process. So that's way less
00:02:26.800 than a penny per minute. And that API is
00:02:29.440 what we'll be using today to build this
00:02:32.200 app. Okay, let's go over some tools that
00:02:35.200 we'll need to make an iOS app. So I'm
00:02:37.280 making an iOS app because I have an
00:02:39.040 iPhone and this app is very much for me.
00:02:41.519 Also, a fun fact is that iOS users on
00:02:44.160 average spend almost twice as much as
00:02:46.879 Android users on inapp purchases and
00:02:49.599 premium offerings. In the US the market
00:02:52.080 share of iOS is actually I think around
00:02:54.879 60% and Android is 40% whereas globally
00:02:58.400 of course it's a different story.
00:02:59.760 Globally I think it's like 71 72% for
00:03:03.040 Android and then 28 or 29% iOS. But I
00:03:07.200 think in the beginning you should just
00:03:08.800 make the app for yourself. So whichever
00:03:10.560 phone you own you should make that kind
00:03:12.159 of app because you should at least be
00:03:13.599 the one using it. Okay. So we'll need
00:03:15.280 Xcode which you can download in the app
00:03:17.360 store. And if you want to actually
00:03:19.200 publish the app, you will need the $99
00:03:22.239 developer program from Apple. Cursor is
00:03:24.879 what we're going to use to build the
00:03:26.640 app. So, it's an AI powered IDE,
00:03:29.120 basically a coding environment that has
00:03:31.599 AI in place so that even non-engineers
00:03:33.920 like me can build it. This is what most
00:03:36.239 vibe coders use along with Windsurf, but
00:03:38.879 Cursor is what I'll be using today. If
00:03:40.959 you want to learn more about cursor,
00:03:42.319 check out these other videos. We're also
00:03:44.319 going to use OpenAI's API to power the
00:03:46.879 key feature, which is the audio
00:03:48.920 transcription and summarization of the
00:03:52.000 content in our app. We're going to need
00:03:54.799 AI and LLM's helped for brainstorming
00:03:57.439 and turning out some code. So, that
00:03:59.920 could be your preferred model. It could
00:04:01.760 be Claude, Gemini, GBT, whatnot. And
00:04:04.159 we're going to design the app using a
00:04:06.400 variety of tools. For me, I use Figma,
00:04:08.720 MidJourney, Adobe Fireflies, and
00:04:11.040 Illustrator, Chacht, Gemini, whatever
00:04:14.080 floats your boat. Superbase is optional,
00:04:16.320 but if you want like a production ready,
00:04:19.440 likely you want some authentication and
00:04:21.680 database, which Superbase would make it
00:04:23.600 a lot easier. For our purpose today, I
00:04:25.919 don't think we're going to use it
00:04:27.040 because I just want a quick MVP to
00:04:29.840 demonstrate how very feasible this is.
00:04:32.720 to make it production ready. That's a
00:04:34.960 whole other level of effort that would
00:04:36.880 take me a few days to complete a whole
00:04:40.080 app. So, we're not doing that today.
00:04:42.240 Today, we're just banging out an
00:04:45.639 MVP. Okay, now it's the hands-on time. I
00:04:49.040 think to build any app, don't expect
00:04:51.199 that you could oneshot it to build like
00:04:53.360 the whole entire app. And instead, there
00:04:56.000 is a process to this and I think it will
00:04:58.160 take at least a couple hours even for an
00:05:00.080 MVP. So this is roughly my process here.
00:05:02.639 There's the pre-planning phase, the
00:05:04.320 setup phase, the breakdown task phase,
00:05:06.720 the implement one by one phase, the
00:05:09.360 debugging phase, and the UI improvements
00:05:11.440 phase. This is generally the steps that
00:05:13.199 we'll take today to build our Q AI voice
00:05:16.400 note app. We're going to go step by
00:05:18.320 step. So the first step is the
00:05:19.919 pre-planning step. In this step, we're
00:05:21.759 trying to brainstorm what our app will
00:05:24.000 be, and you're going to chat back and
00:05:26.240 forth with an AI. My tip here is that
00:05:28.479 you should use deep research to create a
00:05:30.720 technical implementation plan with the
00:05:33.120 latest best practice. So here I'm using
00:05:35.360 Gemini Advance with deep research. I
00:05:38.240 think Google has just been killing it. I
00:05:40.160 really like what Google has been doing.
00:05:42.240 And you can see here that my prompt is,
00:05:44.560 hey, I want to make this AI powered iOS
00:05:47.039 voice note app called Bobotes. And I
00:05:49.919 linked it to my product brief that I got
00:05:53.360 from chatting back and forth with one of
00:05:55.520 the LLMs. I'm asking them to help me
00:05:57.919 build an AI powered iOS voice note app
00:06:00.800 and I want to make sure that this is
00:06:03.440 something that you build in 2025 using
00:06:05.840 Xcode 16.2. I wanted a wellressearched
00:06:09.280 implementation plan for building this
00:06:11.520 iOS AI powered voice note app in 2025
00:06:15.039 using the latest Xcode. Gemini is going
00:06:17.600 to do some research and help me figure
00:06:20.160 out what is the best iOS framework and
00:06:22.960 services that's suitable targeting Xcode
00:06:25.919 16.2. Obviously, you want to chat back
00:06:28.560 and forth with AI with the product brief
00:06:31.120 as well. So, I already have figured out
00:06:33.360 what my key screen should be, what it
00:06:35.120 should look like, what it should do,
00:06:36.479 what function it should have. That part
00:06:38.000 you just brainstorm with an LLM and kind
00:06:40.080 of chat back and forth and maybe even
00:06:41.840 share screenshots of what you're
00:06:43.600 envisioning to come up with the PRD. But
00:06:46.160 on top of the PRD, make sure you have a
00:06:48.319 technical wellressearched implementation
00:06:50.960 plan. So that's my first tip. And then
00:06:53.600 with the pre-planning done, we're ready
00:06:55.919 to move on to the setup phase. In the
00:06:58.160 setup phase, you are going to download a
00:07:01.440 few things. There's cursor and Xcode.
00:07:04.400 Basically, what we're going to do is
00:07:05.919 follow the best practices here under
00:07:08.560 docs.cursor.com.
00:07:10.240 They have a swift guide that talks
00:07:12.400 through what do you need to install to
00:07:14.800 make sure that your Xcode development
00:07:16.880 process is more seamless. So there's
00:07:19.360 just a few things that we need to
00:07:20.720 install here and I've listed them out
00:07:23.199 over here. What you're going to do is
00:07:24.880 you're going to open up Xcode and you're
00:07:27.039 going to create a new project and select
00:07:29.120 app and then you're going to go click
00:07:30.960 next and then Bobo notes. It's the name
00:07:33.360 of my project and then just create the
00:07:35.520 folder where you usually have your
00:07:37.120 development files. It doesn't really
00:07:38.960 matter. And after that, you're going to
00:07:40.880 open up cursor. You're going to open the
00:07:43.280 project and select the project folder
00:07:45.680 you just created. You'll notice here
00:07:47.440 that the files are the same and that
00:07:49.599 means the folders are linked. So there
00:07:51.840 are a few things that we're going to
00:07:53.120 install. Basically, Sweeppad and Sweet
00:07:55.440 language supports and these three
00:07:57.360 commands are what you need to download
00:07:59.840 in cursors. Open up cursor over here.
00:08:02.879 And the first thing is installing the
00:08:04.720 extension. So, if you tap over here or
00:08:07.680 you can expand this, you'll see
00:08:09.720 extensions. So, you're going to click on
00:08:11.680 that and you're going to search for
00:08:13.599 Sweet Pad. And so, you're going to click
00:08:15.759 install. I've already installed it. The
00:08:18.000 other one that you want to install is
00:08:19.680 called Swift Language Support. I think
00:08:22.240 it's the most popular one. So, just
00:08:24.479 download it. I've already installed it.
00:08:26.720 So, I'm all set now. Put the this carrot
00:08:29.360 over here. And you can select sweet pad.
00:08:31.919 Basically, you go over here, select
00:08:34.159 sweep pad generate build server config
00:08:36.719 and then selecting your project and it
00:08:38.719 will run. Then over here, you're going
00:08:41.360 to click this toggle panel at the bottom
00:08:44.640 to bring up the terminal. You can also
00:08:46.480 press command J to do that. We are going
00:08:48.880 to use the terminal to install some of
00:08:52.320 the other items which is listed over
00:08:54.959 here. Copy this and then go over here.
00:08:58.160 Pasting it in. Brew install Xcode build
00:09:00.959 server. And then now it's downloading
00:09:02.959 and done. Next, we're going to copy brew
00:09:05.600 install xc beautify. Pasting it in.
00:09:09.720 Oops. Brew install xc beautify. And then
00:09:13.440 the last one is brew install swift
00:09:16.920 format. So you just have to install
00:09:19.200 those. I've already installed them.
00:09:20.640 That's why you see the warning. Now that
00:09:22.560 you've installed all of these, you're
00:09:24.240 ready to go into the next step, which is
00:09:26.320 breaking down task. Now, what we're
00:09:28.240 going to use is this thing over here
00:09:30.560 called Claude Taskmaster. A lot of
00:09:32.880 YouTubers have talked about this. It's
00:09:35.200 an AI powered task management system
00:09:37.519 that allows you to take a project and
00:09:40.080 breaking it down into smaller tasks. So
00:09:42.800 then the AI is more likely going to
00:09:44.880 complete it. To use this, the
00:09:46.720 instructions actually really simple.
00:09:48.640 We're gonna install it through MCP which
00:09:51.200 is recommended. By the way, I have other
00:09:53.360 videos talking about MCP servers and
00:09:55.680 what it is that you can watch over here.
00:09:58.320 So, you can again put a right carrot
00:10:01.120 over here and just click on cursor
00:10:02.880 settings and you can go to MCP over here
00:10:06.959 and then you can add new global MCP
00:10:09.440 server. What you're going to do is click
00:10:10.959 on that and copy this whole thing over
00:10:14.560 here and replacing your own anthropic
00:10:17.279 and perplexity API keys and then pasting
00:10:20.160 it in there and then just toggle this so
00:10:22.880 that it's green cuz you want to enable
00:10:25.200 it. And after you've done that, you've
00:10:27.880 successfully set it up. And so the
00:10:30.240 command to copy then is over here
00:10:32.800 prompting to AI to initialize
00:10:34.920 taskmaster. Make sure you have agent
00:10:37.519 selected over here in this chat. and
00:10:39.680 then asked to initialize
00:10:42.360 taskmaster. For some reason, the
00:10:44.320 taskmaster didn't immediately
00:10:46.320 initialize, but no worries, you just
00:10:47.920 chat with it and answer the questions.
00:10:49.600 Now, you can see that they called an MCP
00:10:51.839 tool and you'll see on the left hand
00:10:53.839 side that there are new files that has
00:10:56.399 been created, right? So, there's script
00:10:59.200 and under script folder, you'll see an
00:11:01.760 example prd.ext. Once you see this
00:11:05.040 example prd.ext, text. You can rename it
00:11:08.720 to just
00:11:10.200 prd.ext. And I'm actually going to
00:11:12.640 replace all of this with the notes that
00:11:16.160 Jam and I came up with through deep
00:11:18.160 research. Now that you pasted this in,
00:11:20.320 you're ready to move on to the next
00:11:21.839 step. You can just ask the agent to use
00:11:25.160 prd.ext to break down the task.
00:11:27.360 Remember, I've already created an Xcode
00:11:29.519 app. I just usually like to add that
00:11:31.440 because otherwise they might create
00:11:32.800 another file or something. Now it's
00:11:35.360 calling the MCP tool. They have
00:11:37.200 successfully generated 10 initial tasks
00:11:39.440 from your prd.ext. What we're going to
00:11:41.519 do is click on task and just go to
00:11:44.360 task.json. You're going to take a quick
00:11:46.480 look and for some reason this isn't
00:11:49.440 tailored to my PRD. So these tasks is
00:11:52.800 very generic and isn't specific to my
00:11:55.440 project. You can see that it's front-end
00:11:57.519 project with chosen framework. This is
00:11:59.519 very generic. So, what I'm going to do
00:12:01.279 is ask the agent to regenerate it and
00:12:04.399 remove these task. Rerunning the
00:12:07.079 process, instructing the AI to focus on
00:12:09.920 the phases and tasks outlined. Now, you
00:12:12.639 can see if this makes more sense. Looks
00:12:15.120 like they broke it down into 15 steps.
00:12:19.519 That's a lot. Earlier, it broke it down
00:12:22.399 to 15 tasks, but I think that's too long
00:12:24.880 for me to film this in one day. So I
00:12:27.200 just told it to break it down into seven
00:12:28.880 tasks at most. And now this is what it
00:12:31.519 looks like. And you can look at it task
00:12:33.839 by task. You can also just double check
00:12:36.240 using the terminal. Type in taskmaster
00:12:38.720 list. You'll see there are these tasks
00:12:41.200 that are created. Now that we have
00:12:43.120 broken down task, we're at the implement
00:12:45.279 task by task step. You could see that
00:12:47.680 I'm asking cursor to work on task number
00:12:51.120 one. Can you work on task number one,
00:12:53.200 please? I've already created an Xcode
00:12:55.279 project. While cursor is doing this, we
00:12:57.839 can look again at task number one in
00:12:59.920 more detail. Task number one is creating
00:13:02.320 a new iOS project which we've done
00:13:04.720 already. Set up the project structure
00:13:06.959 according to the PRD. So that's what
00:13:08.880 cursor is doing. And then configuring
00:13:11.560 info.plist with NS microphone usage
00:13:14.639 description. Create secrets.exe config
00:13:17.360 file for API key storage and add to get
00:13:20.079 ignore link secrets. So you can see this
00:13:22.800 is what we need to do in step one. So,
00:13:25.120 even though it says it's done, we're
00:13:26.959 going to go to Xcode and see if it
00:13:30.680 runs. You'll see here that there are
00:13:33.440 some warnings over here. There are some
00:13:36.320 things that I already know that needs to
00:13:38.639 be worked on even though they said it's
00:13:40.480 done because right here it says
00:13:42.160 configure info.p list with NS microphone
00:13:45.200 usage description, but I didn't see
00:13:48.000 anything related to that. I am going to
00:13:50.399 ask it to review task number one and
00:13:52.959 give me detailed instructions in setting
00:13:54.800 up in Xcode. Walk me step by step and
00:13:57.120 give me clear instructions to what I
00:13:58.800 need to do manually in Xcode because
00:14:01.360 there are some stuff that you probably
00:14:03.519 need to do in Xcode that the AI agent
00:14:06.000 just assumed you know how to do or that
00:14:08.240 you did. So the first tip that I have in
00:14:10.800 terms of iOS app building is making sure
00:14:13.440 you ask for detailed setup instructions.
00:14:16.160 So let's review it. It's asking me to
00:14:18.320 create the secrets.exe config file. I'm
00:14:20.959 going to ask it to do that for
00:14:23.560 me. Now, you can replace this with your
00:14:27.240 key. You just need to paste the OpenAI
00:14:30.000 key, which I'll do, and you should do
00:14:31.839 the same thing, too. And this should be
00:14:34.000 part of get ignore. Now that I've added
00:14:36.399 this, we're going to link it to the
00:14:38.880 build configuration. Again, the reason
00:14:41.040 why you ask for detailed instructions is
00:14:43.040 so that they would walk you through
00:14:44.320 this. So go to project info tab and
00:14:47.560 configurations following the
00:14:49.480 instructions. We're going to go over
00:14:51.680 here. Over here you can set the
00:14:54.680 configurations under info. You can
00:14:56.959 select adding it over here. Selecting it
00:15:00.880 and then same with the release. And for
00:15:03.760 now that's what you need to do. After
00:15:05.680 that step we're going to set up info.p
00:15:08.639 list over here. Go to the target bubble
00:15:11.279 notes. Click under info. And then
00:15:13.199 somewhere over here you can select any
00:15:15.199 of these. You can click
00:15:17.399 add and it will add a new option. And
00:15:20.720 you want to search for privacy and find
00:15:24.160 the option microphone usage description.
00:15:27.920 Then in the value just copy this. They
00:15:31.600 already gave it to you. I love this
00:15:33.440 because the agent even gives you the
00:15:35.440 message to input into Xcode. So over
00:15:38.320 here, you just have to click over here
00:15:40.639 and paste in the microphone message. And
00:15:44.000 now you're going to add another role
00:15:46.240 over here. And this one is going to be
00:15:49.120 open AI API key. So make sure it's the
00:15:55.040 same thing. Open AI API key. For the
00:15:58.240 value, you're going to copy this blur.
00:16:00.480 See how I'm just copying what they're
00:16:02.720 telling me to do over here. This tells
00:16:04.720 Xcode to substitute the value from your
00:16:07.560 secrets.execonfig file during the build
00:16:09.839 process. And just now I noticed there
00:16:11.759 are two content views over here. Make
00:16:14.480 sure that there are no duplicate files
00:16:16.880 like that. I told them and then they
00:16:18.880 removed one. So now it should be the
00:16:22.160 correct one. Even though they said this
00:16:24.160 should complete the necessary file
00:16:26.000 structure changes for number one. Mark
00:16:28.399 as done. We're going to not move on. We
00:16:31.440 want to make sure it builds at the end
00:16:33.519 of every task. We need to test run the
00:16:35.920 build before proceeding to the next
00:16:38.079 task. So there are a few ways to do
00:16:40.480 this. We want to clean the build. So
00:16:42.639 what you do is go to product clean build
00:16:45.199 folder. So shift command K and then
00:16:47.680 commandB to build again. And if the
00:16:50.079 build succeeds, that's when you can move
00:16:51.920 on. If it doesn't succeed, you do not
00:16:53.759 want to move on. You want to fix this
00:16:55.600 task. So then this task runs before you
00:16:58.000 move on to the next task. One thing I
00:17:00.399 want to make sure you're aware of is
00:17:03.199 Sweetpad. Remember what we installed
00:17:05.439 Sweetpad, right? So, Sweetpad, the
00:17:08.000 reason why you want to install it is
00:17:09.599 because it's going to make your life a
00:17:11.760 little bit easier cuz it will allow you
00:17:15.199 to run the app and kind of check out the
00:17:17.839 problems and debug on your computer. So,
00:17:20.640 you'll see
00:17:21.959 here, this is what my app currently
00:17:24.640 looks like. I now have these three items
00:17:28.480 on here. You can also run it on Xcode.
00:17:31.280 And now you can see that my phone has
00:17:33.280 the same screens as the one that's
00:17:35.280 created from Sweet Path if you run it on
00:17:37.200 Xcode. Earlier I just did task one, but
00:17:39.520 you could see that I went back and
00:17:40.880 forth. I was debugging a little bit.
00:17:42.559 There were some stuff that didn't make
00:17:44.000 sense to me that I chatted with the AI,
00:17:46.160 but now that it built, I am ready to
00:17:49.360 move on to the next task. Now that we're
00:17:51.600 ready for task number two, we just say
00:17:53.600 run taskmaster and start task number
00:17:56.080 two. If you go to task number two,
00:17:58.799 you'll see what we have over here. It's
00:18:01.600 creating the journal entry model with
00:18:03.520 swift data and implementing the
00:18:05.520 persistence layer. The first step is to
00:18:07.600 implement the journal entry model and
00:18:09.440 the mood. Should I go ahead and start?
00:18:11.520 Make sure you review my existing project
00:18:13.440 structure before creating and deleting
00:18:15.120 any files. In cursor, you can select
00:18:17.679 different agents. My recommendation is
00:18:20.000 that you choose a model that is latest
00:18:22.720 and also free because it adds up if you
00:18:25.520 use a paid model. But if you have the
00:18:27.600 money, of course, go for it. I try to
00:18:30.000 use a later model because when you're
00:18:33.200 building iOS apps and if you use a model
00:18:35.919 that's 2 years old, they don't have the
00:18:37.840 latest knowledge about Xcode and it can
00:18:41.200 make your life a lot more difficult. So
00:18:43.440 when possible, try to use a later model.
00:18:46.320 One thing I forgot to do which I will do
00:18:48.799 after task number two is version control
00:18:51.600 so that you can revert. Actually this
00:18:53.520 step should be right after task number
00:18:55.679 one. Once your build runs and build
00:18:58.960 successfully you should commit your
00:19:00.640 build so you can roll back if something
00:19:02.880 happens in task number two. It says it's
00:19:05.200 done. And then I'm going to build it and
00:19:06.960 make sure there's no errors. So it looks
00:19:09.280 like it built and I'm going to show you
00:19:11.600 here. They said task number two is done
00:19:14.000 already, but I'm just going to make sure
00:19:16.320 this runs. So, you can play. I'm going
00:19:18.880 to run sweep to make sure this builds.
00:19:22.160 Okay, it seems to and it runs. To
00:19:25.919 version control this, you're going to
00:19:27.760 create a project on GitHub and I'm just
00:19:30.640 going to copy this then pasting it into
00:19:36.440 here. So, you can actually ask the agent
00:19:39.200 for help in committing. Now that this is
00:19:41.760 done, you should be able to see it here.
00:19:44.240 There's no more new updates. This is
00:19:46.320 another way you could do version
00:19:47.840 control, but I wanted to push to GitHub
00:19:50.080 so I can access it anywhere whenever I
00:19:52.320 want. So you will be able to see in the
00:19:54.480 code, the codes updated, there's a read
00:19:57.120 me. Now that you have done task number
00:19:59.679 two, you did version control. You've so
00:20:02.799 far learned these three tips. Detailed
00:20:04.960 setup instructions, version control, use
00:20:07.039 more recent LLM models. we can start
00:20:09.520 working on task number three. I'm asking
00:20:11.440 cursor to do task number three. Task
00:20:13.600 number three has to do with audio
00:20:15.120 recording and playback service. So
00:20:17.200 hopefully by the end we can start
00:20:20.160 testing recording. Now that it's done,
00:20:22.400 you want to clean the build and build
00:20:24.240 it. Okay, now I'm on my phone. I think
00:20:27.039 what we want to do is try the record.
00:20:29.520 Looks like it's not connected to the
00:20:31.360 view. It build successfully, but I can't
00:20:33.919 see it. They said you're going to do it
00:20:35.520 in task number six. So you should just
00:20:37.600 mark task number three as done. So we'll
00:20:40.080 follow what the AI agent said and say,
00:20:41.840 "Okay, task three is done." So now I'm
00:20:44.080 asking it to update these
00:20:47.640 changes. Because it runs, I'm going to
00:20:50.000 let it slide and just move on to the
00:20:52.400 next task. Task number four is OpenAI
00:20:55.600 service implementation. So create the
00:20:58.159 OpenAI service to handle the API calls.
00:21:01.440 We have this OpenAI service swift.
00:21:04.000 They're going to transcribe using
00:21:05.440 whisper and implement functions for GPT
00:21:08.640 analysis using chat completions API. Let
00:21:11.360 me just take a look over here. Okay,
00:21:14.240 perfect. So, it had the prompt that I
00:21:16.400 gave it, the system prompt and
00:21:18.000 everything. This looks good to me. Let's
00:21:19.760 make sure it builds. Clean the build
00:21:21.840 first and then build succeed. At the
00:21:23.840 end, you can make sure that they review
00:21:26.000 the entire task and make sure everything
00:21:27.840 is done. In this case, they said, "Okay,
00:21:29.840 there's something that maybe you could
00:21:31.200 implement, which is the retry logic, and
00:21:33.039 it adds complexity. Do you want to do
00:21:34.559 it?" And I'm going to say yes. Add some
00:21:36.159 basic retry logic for me. Okay, now that
00:21:38.480 they added the retry logic, let's see if
00:21:40.720 it runs. There's a warning. Got a
00:21:43.880 warning. And now the build succeeded.
00:21:46.480 Because it runs, we're done with that
00:21:48.799 task number four. See how quickly this
00:21:50.960 goes. And I have it pushing to GitHub.
00:21:55.200 And now it's running the next task. Task
00:21:57.840 number five, this is the recording and
00:22:00.080 processing UI implementation. So this is
00:22:03.280 when they are going to have more visual
00:22:05.840 effect and hopefully by the end of this
00:22:08.240 we are going to see some UI updates to
00:22:10.559 our app. And let's try to run it on
00:22:13.400 Sweepad. Now you will tap to record and
00:22:16.880 you should be able to see this notes
00:22:18.640 which was the note that we inputed in
00:22:21.200 the info.p list earlier in Xcode. We're
00:22:24.480 going to click allowed and let's see if
00:22:26.400 it records. Stop processing your entry.
00:22:29.360 And you can see that something is
00:22:30.799 happening. You can see on my phone that
00:22:33.280 there's this message we inputed earlier.
00:22:36.080 You can now record analyzing text. It's
00:22:39.039 saved. Hi there. I am recording and
00:22:41.840 learning about how to make an iOS app.
00:22:44.880 Analysis is complete. Done. You could
00:22:46.799 see this piece is done. And you also
00:22:49.440 look here as well. You could see the
00:22:51.520 title reflecting on challenges and
00:22:53.360 growth. This is generated from the
00:22:55.120 OpenAI API and you can see the file is
00:22:57.919 created. It looks good to me. So let's
00:23:00.640 go back, make sure task number five is
00:23:02.880 done and it built. So there's no more
00:23:04.880 warning. This looks good to me. I wanted
00:23:07.280 to commit changes and push to GitHub.
00:23:09.360 Calling the MCP tool push to GitHub.
00:23:11.840 Ready for the next task. Task number six
00:23:14.720 has to do with entry detail and home
00:23:16.720 views implementation. Hopefully by the
00:23:18.960 end of it, we can start toying around
00:23:21.120 with this. When task number six is done,
00:23:23.440 we clean the build folder and we build
00:23:25.360 again. And now you'll see this over
00:23:27.440 here. Let's try it. I'm just really
00:23:29.919 happy that I can record my voice.
00:23:32.880 Transcribing, analyzing, analysis
00:23:35.440 complete. Done. Let's see if it's there.
00:23:37.440 Okay, awesome. See that? This is there
00:23:40.640 already. Isn't this beautiful? And let's
00:23:43.360 see if it plays back. Let me see. just
00:23:45.440 really happy.
00:23:47.919 Okay, so I think the playback sounds a
00:23:50.400 little bit weird, but let me try it on
00:23:52.080 my phone. The conversation that's most
00:23:54.799 important are the ones that you have
00:23:56.880 with yourself. I'm going to play
00:23:59.559 it. Oh, playback error. Huh. It's
00:24:03.440 interesting because I could not play
00:24:05.440 back. So, this is when you are debugging
00:24:08.240 and you want to show them give the
00:24:11.600 error. When you get an error, just go to
00:24:13.919 the issue navigator tab or the debug
00:24:16.080 area in Xcode and copy the errors. Then
00:24:18.880 paste it into cursor and have the agent
00:24:21.279 fix them. And then building it again.
00:24:23.200 Okay, now it's the same one. Let's click
00:24:25.600 on it and play back. The conversation
00:24:28.400 that's most important are the ones that
00:24:30.880 you have with yourself. Woohoo.
00:24:34.360 Yay. Okay, so now that this plays back
00:24:38.159 well, I think this task is pretty much
00:24:40.480 done. We can take a look again. By the
00:24:42.559 way, this is super enabled and made so
00:24:45.440 easy because of OpenAI's API. Anybody
00:24:48.559 could do this. It's not just me. Anybody
00:24:50.880 could do it. Okay, so now that this
00:24:53.200 transcription app is done, there's diary
00:24:56.360 reflection. It categorizes. I love it.
00:24:59.200 We were able to run it. We can do the
00:25:01.600 playback. It looks fine to me. It's not
00:25:05.520 bad at all. And it has cute emojis and
00:25:08.480 whatnot. It has my mood. It has a
00:25:10.480 summary. It has a transcription. And it
00:25:12.720 allows you to play back. Let's go to
00:25:14.880 task number six. You could run
00:25:17.440 taskmaster again to see what else is
00:25:20.240 left. Number two still says in progress.
00:25:23.039 Maybe we forgot to mark it as done.
00:25:24.799 We're at entry detail and home views
00:25:27.279 implementation. I think we've already
00:25:29.279 done that. It looks like we actually
00:25:30.960 completed most of task six when
00:25:32.880 implemented task number five's UIs in
00:25:34.720 the subsequent fix. Fully implemented
00:25:36.799 with the list navigation and row
00:25:38.400 display. the connection to save entries
00:25:40.240 also implemented. Add basic search or
00:25:42.880 filter functionalities. Yes, that sounds
00:25:45.679 right. Please add the search
00:25:48.360 functionality to home view.sswift. Okay,
00:25:51.200 we just need to do home view and connect
00:25:53.760 the successful recording flow to create
00:25:56.480 and save new entries. Oh no, there's
00:25:58.799 something that's crazy though. They just
00:26:01.360 committed my changes even though I
00:26:04.159 didn't approve it yet. That's the YOLO
00:26:06.880 mode for you. Woah, it's like speeding
00:26:09.440 through things. Wow, that's the first
00:26:11.279 time I saw that. That it just ran ahead
00:26:13.919 without consulting me. And again, it
00:26:16.159 built. Hi there. I am really excited
00:26:19.279 about dinner tonight. I think I'm going
00:26:21.200 to have some sushi. Okay, done. Then you
00:26:23.440 can see it here. Anticipating a
00:26:25.360 delightful dinner. Oh, and it has a cute
00:26:27.679 sushi thing because I want to eat sushi.
00:26:30.159 Hi there. Okay, so it looks like it's
00:26:32.320 recording. Oh, so the thing that we
00:26:34.159 implemented is the search bar over here.
00:26:36.799 So over here you can now search for
00:26:38.960 sushi and if you search for sushi it
00:26:41.279 will be right here. This agent forgot to
00:26:43.600 implement this filter that I wanted.
00:26:45.360 They added search but not the filter. So
00:26:48.159 now it's doing that but it's committing
00:26:50.960 again. That's crazy. It just keeps
00:26:53.440 going. This is going too quickly for me.
00:26:55.919 Suddenly something changed. It's like
00:26:58.159 this model is so much more proactive
00:27:00.080 than before. What the heck? Okay. I
00:27:03.200 guess this is all. And then you can
00:27:05.120 filter by today I learned. Reflection
00:27:08.000 entries are there. It's weird that this
00:27:10.400 moves around. It just did task number
00:27:12.799 seven for me without me telling it to. I
00:27:15.919 want to walk you through task number
00:27:17.600 seven, but this AI agent just did it for
00:27:20.320 me without my consent. Task number seven
00:27:23.520 is complete the endto-end flow, add
00:27:26.159 error handling, and polish the MVP UI
00:27:28.559 delivery. Okay, let's look at this
00:27:30.720 again. Repeat. This is what it looks
00:27:32.720 like now. They polished it. Yes. And for
00:27:36.240 some reason it links to my GitHub
00:27:38.000 repository. That's cool though. You
00:27:39.919 could see this is done. You could delete
00:27:41.919 an entry if you want. I'm not going to
00:27:43.840 do that just now. The only thing is I
00:27:46.000 don't like the filter being on the top.
00:27:47.919 Okay. So, I just wanted to tweak that
00:27:50.240 one thing. But you could see that our
00:27:51.919 app in terms of the functionality, it's
00:27:54.320 fully there. What? It keeps committing.
00:27:56.559 Something is so interesting because all
00:27:59.120 of a sudden this YOLO mode is really
00:28:01.360 pushing all my changes. It's okay. I
00:28:04.159 guess I'm okay with it because this is
00:28:06.399 just an MVP build for me. And so what
00:28:10.559 I'm going to do is running it here for
00:28:12.399 you to see. I updated this. So then you
00:28:14.640 can see the filter over here. So now we
00:28:17.120 have this layout over here. We have
00:28:19.440 generally speaking the features and what
00:28:22.399 it looks like. This app is now feature
00:28:24.480 complete for the MVPO. You can see on my
00:28:26.720 phone it's running. You can see all the
00:28:29.159 filters working perfectly. And you can
00:28:32.480 see the record button. I think I spent
00:28:35.279 one hour or something, not even two
00:28:37.039 hours yet on this. And you can see that
00:28:39.279 it's a pretty good MVP right now. But
00:28:41.679 we're going to make it even better by
00:28:43.360 making it beautiful. We're again going
00:28:45.360 to work with agent. But now I'm not
00:28:46.960 going to use too much of this task
00:28:48.880 manager anymore. So, some tip here is to
00:28:51.840 use the design app that you have or
00:28:53.919 whatnot and design an app and just tell
00:28:57.360 them what you want this to look like. I
00:29:00.159 have a mockup already that I did a while
00:29:02.640 ago. I want the app to roughly look more
00:29:05.840 like this. And so now, if I want it to
00:29:09.919 look like this, I can work with the AI
00:29:11.600 agent to do this. But I need to upload
00:29:14.559 some things first inside the assets
00:29:17.279 folder. So, if you go to Xcode and
00:29:19.440 assets, this is where you can upload the
00:29:21.679 app icon and other assets. I'm just
00:29:24.480 dropping in all the kind of UI thing
00:29:26.960 that I have. And after you uploaded it,
00:29:30.320 then you can tell AI what you want your
00:29:32.960 app to look like and have them help you
00:29:35.120 fix it. Okay, now it looks like this. I
00:29:37.919 think they want me to rename this to
00:29:40.000 mascot. So, I'm going to rename this. I
00:29:43.760 also need to go to info p list to add my
00:29:46.640 custom fonts to add these. You're going
00:29:49.279 to add it over here. Just add the file
00:29:52.159 names. Make sure you copy and paste and
00:29:54.640 add all your fonts here. Okay, now that
00:29:56.720 I added the assets, this is what it
00:29:58.799 looks like right now. I thought this was
00:30:00.640 a little bit strange. Okay, I fixed the
00:30:03.120 date and time. Now it clicks, but the
00:30:06.880 there are two right arrows. The good
00:30:09.520 thing about having Sweet Pat is that you
00:30:11.919 can just screenshot by pressing this and
00:30:14.000 then pasting it in here to debug. Now
00:30:16.159 you could see that my app there's some
00:30:18.159 filters. I think I like this background
00:30:20.240 a little bit more. I'm tweaking a few
00:30:22.320 more steps and then we should be good to
00:30:24.159 go. I need to also tweak this screen and
00:30:26.960 the entry detail screen. It looks good
00:30:29.360 to me over here. Think clicking on here
00:30:32.240 matches the style a lot more now. The UI
00:30:35.120 is coming together pretty neatly. my app
00:30:37.679 is close to being done. But I realized
00:30:39.360 that there were a few more tips that I
00:30:41.039 wanted to share with you guys that I
00:30:42.559 haven't. So if there is a bug and you
00:30:45.200 just can't solve it, there are a few
00:30:47.279 things you could try. Number one is you
00:30:49.200 could try composer like using the manual
00:30:51.679 mode. And how you could do that is
00:30:54.720 instead of agent, you would just use
00:30:56.480 manual. This is what they called
00:30:58.240 composer back in the day. I find that
00:31:00.399 sometimes if agent doesn't work well to
00:31:02.880 solve it, maybe just using the manual
00:31:04.960 mode sometimes does the trick. Another
00:31:07.919 tip is that you want to ask the agent to
00:31:10.159 add more loggings so you can identify
00:31:12.559 what's going on. You can also use at web
00:31:15.440 and get the agent to search for latest
00:31:17.679 best practices, especially when it comes
00:31:19.840 to Xcode. Lastly, this is just what I
00:31:22.559 like to do. Sometimes I'm like telling
00:31:24.480 the LLM that, "Oh, your junior developer
00:31:26.960 screwed up and please act like a tech
00:31:29.440 lead and fix this for them and sometimes
00:31:31.679 that works too." So those are my few iOS
00:31:34.399 app building tips. And for minor tweaks,
00:31:37.360 you can actually ask the agent to point
00:31:39.120 you to where in the code it affects and
00:31:41.360 you can change the margin or whatnot.
00:31:43.600 For example, I say it's a speech graphic
00:31:45.919 and they called it speech bubble
00:31:47.600 graphic. That's why it's not showing up
00:31:49.120 here. Just update the name yourself in
00:31:50.960 the code and run it. Speak your heart
00:31:52.399 out. So now this looks more aligned with
00:31:54.880 what I like. In a way, it's like HTML
00:31:57.120 and CSS. I'm just making sure that this
00:31:59.760 looks right to me and it's the way I
00:32:01.919 want it. After some tweaking, my app is
00:32:05.360 completely done. You can see over here,
00:32:07.440 it's super cute. And I can record and I
00:32:11.279 can say something like, I am having such
00:32:13.600 an amazing day building iOS apps. And
00:32:16.320 you can stop it and it will transcribe
00:32:18.159 the audio. Done. And then it will show
00:32:21.360 up on this homepage right here with a
00:32:25.600 summary. You can easily tweak this by
00:32:27.919 the way. You can go to OpenAI service
00:32:30.240 right here. The prompt, you can tweak
00:32:32.240 the prompt, the system prompt that you
00:32:33.919 have for OpenAI and you can change the
00:32:35.840 tone, change whether it's a summary or a
00:32:37.840 coaching thing. This one, I think it's
00:32:39.360 actually more like a coaching prompt.
00:32:40.799 And then there's a transcription. You
00:32:42.399 can listen to it. I am having such an
00:32:44.799 amazing day building iOS apps. See, so
00:32:47.600 that's it. And I do know that I'm going
00:32:50.159 to get called out in the comments
00:32:52.159 saying, "Oh, you're vibe coding. This is
00:32:54.640 not feasible, whatnot." And guys, it's
00:32:57.519 an MVP. At least you can use it and play
00:33:00.320 around with it. I mean, instead of
00:33:02.080 paying $9.99 a month for those apps, you
00:33:04.480 can make your own and use it for
00:33:05.760 yourself. And if you want to make it
00:33:07.279 production ready, what I would do is
00:33:09.360 probably implement like superbase for
00:33:11.399 authentication and setting up your own
00:33:13.679 database. Then maybe asking an iOS
00:33:16.159 developer to just double check that
00:33:18.159 everything is secure before you launch
00:33:19.679 it. Now, this one is just an MVP. I just
00:33:22.240 want to demo to you that in one day or
00:33:24.399 in one weekend, you can totally create
00:33:26.559 this project yourself. It's super fun to
00:33:28.559 build and my goal is really to inspire
00:33:30.880 you to not be fearful of AI, not be
00:33:34.080 fearful of vibe coding and instead just
00:33:36.720 learn it and use it and do cool things
00:33:38.720 with it because I think that there is
00:33:41.760 pros and cons with AI and we shouldn't
00:33:44.399 be fearful. Like there are things that
00:33:46.240 we can control and there are things that
00:33:47.600 we can't control and right now I can't
00:33:49.600 control that one day AI is going to take
00:33:51.840 over the world but what I can control at
00:33:54.320 the moment is building cool stuff with
00:33:56.000 it. I hope you just don't give yourself
00:33:58.159 too many excuses. Instead, just try it.
00:34:00.399 Just do it. It's really fun. And let me
00:34:02.799 know how it goes in the comments below.
00:34:04.799 And if you haven't already, please hit
00:34:06.720 the like or subscribe button or notify
00:34:08.960 button because it will really help this
00:34:10.639 small channel out. And thank you so much
00:34:12.960 for watching. I'll see you in the next
00:34:15.040 video.
