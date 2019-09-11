# 1. Basics

In this chapter you will learn the basic stuff you can make with BachTracking

## 1.1. Workflow

Using BachTracking normally goes like this:
1. Type your music on a text editor, like notepad
2. Tell the score to start playing
3. Write your music in the score (run it)

BachTracking keeps track of the music in your piece in some sort of virtual _score_. In your text editor, you can freely type and write as many ideas as you like. Once you decide what you want to write to the score and when, you select the text you want and you write it to the score. If the score is playing, it will eventually reach the bar where you have written your music, and it will play it.

In other words: the text editor is your color palette; the score is the canvas; running your code is telling someone what colors you want to use in your canvas; and the score playing is someone taking the brush and painting the canvas for you.

## 1.2. Shortcuts 

Right now you can use BachTracking together with a text editor called Visual Studio. I have created a list of shortcuts in this editor, so that you can send instructions to BachTracking.

Here it is a list of shortcuts you can use:
- `Ctrl-R`: **R**un your code
- `Ctrl-S`: **S**tart playing the score
- `Ctrl-shift-S`: **S**top playing the score
- `Ctrl-E`: **E**xit

## 1.3. Basic instructions

### Start
`start`: same as pressing `Ctrl-S`

### Stop
`stop`: same as pressing `Ctrl-shift-S`

### Exit
`exit`: same as pressing `Ctrl-E`

### Set time signature
`time 3/4`: set the score time signature to 3/4.

You can only write one time signature for the whole score, and you can only do so if the score is not playing.

If you don't write any, the default time signature is 4/4.

### Set tempo

`tempo 4=120`: sets the score tempo to quarter note equals 120 BPM.

You can only write one tempo for the whole score, and you can only do so if the score is not playing.

The number on the left follows typical rhythmic notation: 2 is a half note, 4 is a quarter note, etc. Beware! You can't set the tempo to a dotted duration for now (`tempo 4.=120`).

If you don't write any, the default tempo is 4=60.

## 1.4. Music syntax

### Notes

Notes are defined by its pitch. Optionally, you can add accidental, octave and duration.

A pitch can be written with American notation, in lower case: `c d e f g a b`.

Accidentals are sharp (`#`) or flat (`b`). You can add as many as you want. For example, `c##` would be C double-sharp.

You can set the octave with `o` and the octave number before the note, like this `o4 fb` (F flat, octave 4). You can also set the octave as upper (`f'`) or lower (`b,`) compared to the octave of the last note you've written; you can raise or lower the octave as many times as you want (`c,,,,`).

Duration is written like in time signatures or tempo. For example, `c2.` means C note with the duration of a dotted half note.

If you don't write any octave or duration, the note will get it from the previous note. So if you write `o3 c8 d e`, D and E will be in octave 3 and will last for an 8th note, just like C.

Rests are written with the letter `r`, followed by a duration (optional). For example, `r4.` is a dotted quarter rest.

### Melody

Melodies are written with the word `melody` followed by a list of notes. For example: `melody c# d'4. eb o8 f g8`.

You can put repetitions inside your melody with an `x` and the number of times you want to repeat. If you want to repeat more than one note you have to surround them with parentheses. Try nesting repetitions inside repetitions! Like this:
`melody cx2 ((d e)x3 f g)x4 a bx5`
This melody would be played like this:
`melody c c d e d e d e f g d e d e d e f g d e d e d e f g d e d e d e f g a b b b b b`
Now that's saving time huh?

You can use `mel` instead of `melody` as a shortcut.

### Play it!

In order to play music, you first have to start playing the score (`start` or `Ctrl-T`). Then you write the bar where you want to play your music, the instrument to play it, and the music to play.

For instance:
`at bar3 piano melody c e d f g`
Plays the melody C D E F G at bar 3 with the instrument piano.

You can either write `bar3` or `bar 3` (separated by spaces).

Notice only the instrument `piano` is available for now.

Next: [Writing long music](./02-writing-long-music.md)
