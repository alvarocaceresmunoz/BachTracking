# 2. Writing long music

Now you can make a melody, but even with repeats it may take some time to write music... let's spice things up with transformations and variables!

## 2.1. Transformations

Transformations change music you give to them. You can transform either melodies or other transformations (more on that later!)

### Transposition

`transpose melody c d e f g P4` transposes the melody _C D E F G_ a perfect 4th, that is, _F G A Bb C_.

You can use intervals from unison (`1`) to 13th (`13th`).

Intervals can be 
- major: `M`
- minor: `m`
- perfect: `P`
- augmented: `A`
- diminished: `d`

Instead of transposing with intervals, you can transpose with semitones. `transpose melody c d e f g 12` would transpose the melody _C D E F G_ 12 semitones, that is, one octave higher.

You can add `ascending` after the interval to make the transposition ascending. For example, `transpose melody c d e f g P4 ascending` would transpose the melody _C D E F G_ an ascending P4. You can make the transposition descending with `descending` , for instance `transpose melody c d e f g 6 descending`. Omitting this will make the tranposition ascending.

You can use `trans` or `T` instead of `transpose` for short.

You can use `asc` instead of `ascending` for short.

You can use `desc` instead of `descending` for short.

### Inversion 

`inverse melody c d e f g` inverts the melody _C D E F G_, that is, _C Bb, Ab G F_.

Notice inversion is chromatic, not diatonic.

You can use `inv` or `I` instead of `inverse` for short.

### Retrograde

`retrograde melody c d e f g` retrogrades (plays backwards) the melody _C D E F G_, that is, _G F E D C_.

You can use `retr` or `R` instead of `retrograde` for short.

### Retrograde inversion

`retrogradeInverse melody c d e f g` retrogrades and then inverts the melody _C D E F G_, that is, _G A Bb C' D_.

You can use `retrInv` or `RI` instead of `retrogradeInverse` for short.

### Mirror

`mirror melody c d e f g` returns the melody _C D E F G_ mirrored, that is, _C D E F G F E D C_.

You can add `mirrorLast` at the end to make a full mirror of the melody. For example, `mirror melody c d e f g mirrorLast` returns  _C D E F G G F E D C_ (i.e., the _G_ is also mirrored).

You can use `mir` or `M` instead of `mirror` for short.

### Join

`join melody c d e f g melody d e f g a` joins the melody _C D E F G_ and the melody _D E F G A_, that is, _C D E F G D E F G A_.

## 2.2. Variables

Variables store melodies or the result of transformations inside of them. They are "boxes" where you can put stuff that you can use later.

All variables start with the lowercase letter `v`.

For example, `v1 = melody c d e f g` stores the melody _C D E F G_ inside a variable v1. Now you can use it anywhere else, like:
`at bar3 piano retrograde v1`
This will play the retrograde of `v1` at bar 3 with the piano, that is, _G F E D C_.


## 2.3. Combine 'em!

You can stack transformations together, like so:

`at bar3 piano inverse mirror transpose melody c d e f g P4`

Transformations are done from right to left. So the melody in the example above is changed in this order:
1. Transpose a perfect 4th
2. Mirror
3. Inverse

You can also use variables combined with transformations:
```
v1 = M mel c d r2 e8 f g
v2 = mel c# r d#16 (e# f#)x2 g#
at bar1 piano J v1 v2
```

Next: [MIDI input](./03-midi-input.md)
