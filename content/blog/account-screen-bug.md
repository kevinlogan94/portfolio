---
title: "How I Broke the Account Screen for Our Richest Customers (And What I Learned)"
description: "The story of a critical production bug that affected high-net-worth customers and the leadership lessons learned from taking ownership."
date: 2025-12-07
minRead: 6
image: https://swdrcvirhtbxlooklceu.supabase.co/storage/v1/object/public/images/blogs/mistakes.png
author:
  name: Kevin Logan
  avatar:
    src: https://firebasestorage.googleapis.com/v0/b/personal-web-application.appspot.com/o/profile%2Fprofile_headshot_.jpg?alt=media&token=2665e26c-8ab7-4de0-9da9-14e487cfb9f4
    alt: Kevin Logan
---

Back in 2019, I was working as a Software Engineer at a leading bank, leading the charge on a massive tech stack migration. We were converting our core front-end applications from AngularJS to Angular 2.

I was pushing for this. I wanted us to use modern technology, and I wanted to accelerate our team's velocity. I took ownership of converting the Account Screen—a critical piece of the application—and I was feeling good about it. We got the code merged, passed QA, and pushed it to production.

## The Million-Dollar Bug

The next day, the mood on the floor shifted.

I noticed leadership walking around, looking nervous. They were visiting teams with urgent news: There was a critical bug in production. You would be on the accounts screen, click on your specific account, and the app would just freeze.

But it wasn't failing for everyone. It was specifically failing for our high-net-worth tier—customers with millions in the bank. We had one specific customer threatening to leave the bank entirely if they couldn't see their funds by the end of the day.

I immediately grabbed the QA team. I asked them to generate mock data specifically mimicking that high-net-worth user profile so I could replicate the experience. As soon as I loaded that data, the issue was glaring. I clicked the account, and everything froze.

## The Three-Hour Fix

It wasn't a database failure or a complex logic error. It was a single character.

I had missed an optional flag within the code. The standard user never hit that specific data point, so they were fine. But the multi-million dollar customers hit it immediately, and the application crashed.

I didn't panic, and I didn't hide. I wrote the fix (literally adding one character), opened a Merge Request, and pulled the QAs back in. We ran it through three rounds of rigorous testing. From the moment I found the bug to the moment the fix was live in production, it took three hours.

The customer stayed. The panic subsided. I sent an email to the entire team and leadership explaining exactly what happened: *I missed a flag. Here is the fix. We are good to go.*

## The Key to Growth

The easy takeaway here is "write better tests," but that misses the bigger picture.

In that moment, I realized the core lesson to take from this.

**It's not the mistakes you make; it's how you respond to them.**

To accomplish your goals, you will have to take risks with yourself and your work. You have to go the extra mile and do the scary things that nobody else wants to do. That's called being a leader.

Be bold. I could have let this experience terrify me into playing it safe, but I didn't. I kept leading the charge. You have to be willing to learn from your failures, but you cannot let them stop you.

Don't focus on your mistakes, focus on how you respond to them. Do you run away and hide? Or do you take ownership, learn the lesson, and fix it?

