## Task 1. Caesar cipher CLI tool

**Implement CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift (****required option!****)
2.  **-i, --input**: an input file (or stdin as an input source); for encoding/decoding use only the English alphabet
3.  **-o, --output**: an output file (or stdout as an output destination)
4.  **-a, --action**: an action encode/decode (****required option!****)

**Usage example:**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`