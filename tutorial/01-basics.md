# Basics

In this chapter you will learn the basic stuff you can make with BachTracking

## Workflow

Using BachTracking normally goes like this:
1. Type text on a text editor (like notepad)
2. Select the text and press `Ctrl-R`
3. Enjoy!

In BachTracking, you tell your computer to write music to some sort of virtual *score*. When you tell your computer 

## Shortcuts 

Right now you can use BachTracking together with a text editor called Visual Studio. I have created a list of shortcuts in this editor, so that you can send instructions to BachTracking.

Here it is a list of shortcuts you can use:
- `Ctrl-R`: **R**un your code
- `Ctrl-T`: s**T**art playing your score
- `Ctrl-S`: **S**top playing your score
- `Ctrl-E`: **E**xit

## Basic instructions

### Start
`start`: same as pressing `Ctrl-T`

### Stop
`stop`: same as pressing `Ctrl-S`

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

## Music syntax

### Notes

Notes are defined by its pitch. Optionally, you can add accidental, octave and duration.

A pitch can be written with American (`C`) or solfège (`do`) notation. It can either start with upper (`c`, `do`) or lower case (`C`, `do`).

Accidentals are sharp (`#`) or flat (`b`). You can add as many as you want. For example, `c##` would be C double-sharp.

You can set the octave with `o` and the octave number before the note, like this `o4 fb` (F flat, octave 4). You can also set the octave as upper (`f'`) or lower (`b,`) compared to the octave of the last note you've written; you can raise or lower the octave as many times as you want (`c,,,,`).

Duration is written like in time signatures or tempo. For example, `c2.` means C note with the duration of a dotted half note.

If you don't write any octave or duration, the note will get it from the previous note. So if you wrie `o3 c8 d e`, D and E will be in octave 3 and will last for an 8th note.

### Melody

Melodies are written with the word `melody` followed by a list of notes. For example: `melody c# d'4. eb o8 f g8`.

You can use `mel` instead of `melody` as a shortcut.

### Play it!

In order to play music, you first have to start playing the score. Then tell you write the bar where you want to play your music, the instrument to play it, and the music to play.

For instance:
`at bar3 piano melody c e d f g`
Plays the melody C D E F G at bar 3 with the instrument piano.

You can either write `bar3` or `bar 3` (separated by spaces).

Notice you can only have the instrument `piano` available for now.

Next: [Transformations](./02-transformations)
