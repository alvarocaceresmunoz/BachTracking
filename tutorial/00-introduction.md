# 0. Introduction

## 0.1. Wait, what's ...?

### BachTracking

BachTracking is a programming language for making music!

BachTracking is part of my MSc research project, _"BachTracking: a Live Coding Programming Language for Classical Musicians"_. I am trying to understand how do classically-trained musicians (and musicians from similar styles like jazz) may make music with the help of technology. In order to do this, I am designing a programming language that tries to be easy to use and natural for musicians, while being powerful and giving you a huge variety of options to unleash your creative power.

In case you haven't got the pun yet, it is a portamteau of [Bach](https://en.wikipedia.org/wiki/Johann_Sebastian_Bach) (a classical music composer whose work inspired the creation of this language!) and [backtracking](https://en.wikipedia.org/wiki/Backtracking) (an algorithm used in computer science; I only used it because it went well with Bach xd).

### Programming

We use languages to communicate. Right now we are "talking" in English.

Well, when we want to talk to a computer, we can't just use English. We must talk in a language that both the computer and we can understand. Such a language is called a programming language. We program to tell the computer what we want it to do. In the case of BachTracking, we use this language to tell the computer what music we want it to make.

### Live Coding

[Live coding](https://en.wikipedia.org/wiki/Live_coding) is telling your computer to make music live, on the fly. Live coding can be used for visuals or anything else as well. Making music on the fly means that with live coding, you can use your computer to improvise music!

If you find this idea of improvising with a computer a bit weird, think of traditional instruments, like a piano or a guitar. These are machines we use to produce sound on command. Now think of a computer as an instrument... it's also a machine that you can use for many things, including... making sound!

It is true that live coding is different from improvising with a traditional music instrument. With traditional instruments, playing a single note is almost instantaneous: You press a key, or strike a drum, and your instrument starts making sound. With live coding, playing a single note takes more time: you must press several keys to write an instruction, and you must use either your keyboard or your mouse to tell the computer to start playing music.

"Then what's the point of live coding?", you may ask. "If it takes so long to write a single note, why bothering?"

Well the point you are making (a single note) is very important: we can honestly say live coding sucks at playing a few notes fast... but it is **amazing** for writing long, complex pieces of music! Could you play 2000 notes in a second? Probably not; however, if you tell your computer to do it (say, `play notes in [0..2000]`), the computer will do it effortlessly, in the blink of an eye. A good exapmle of this is [Conlon Nancarrow](https://youtu.be/g0gNoELvpPo?t=264)'s music, which was "programmed" for piano rolls; it is incredibly complex and beautiful music no human being can play directly. Here's where live coding is good for: playing long and complex music, as long as it follows a pattern.

It may take you a while to get the hang of it; in the end learning live coding is like learning any other music instrument. You must wrap your head around these ideas:
1. Planning: we have seen that live coding works nicely if you want to play long, complex music. Because of this, you have to think of music not as individual notes, but more in terms of big structures that you can play with and combine.
2. Abstraction: like maths, programming allows you to take something you understand, put it in a box, and use it everywhere you want without ever worrying again about what was inside of that box. That's abstraction. Imagine you put a long melody you have written in that box: you no longer have to write that melody note by note, you just use that box which is easier to handle.
3. Carpe diem: live coding is improvisation, so it is alive. You may be playing at bar 1, and next thing you know you are at bar 5. So try to plan things out and use abstraction as much as you can, but... _you gotta be fast!_.

## 0.2. Only for classical music?

No! You can use BachTracking for making other styles of music, but it was designed with classical music (and similar styles) in first place.

The reason for this is that there exist other live coding languages (languages you should definitely check out, like [SuperCollider](https://supercollider.github.io), [SonicPi](https://sonic-pi.net), [Tidal](https://tidalcycles.org/index.php/Welcome)...), but they work best for making electronic music. You can change samples, synthesizers, etc., but it is hard to think of it if you come from styles like classical, jazz... BachTracking syntax resembles terms used for these music styles, so that it becomes a language that musicians can easily "speak". Also, BachTracking makes you think of code as some sort of score, which is easier to wrap your head around if you are used to reading music.

## 0.3. Installation

I'm working on that! For now the software can be installed in particular operating systems with specific software installed, but it can be hard for novice experts.

If you are reading this, chances are the project is still in beta phase, and so you will try the language using my computer... no need to install anything! I will provide you with the program, MIDI keyboard and anything you may need.


Next: [Basics](./01-basics.md)
