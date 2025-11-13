async function checkInputSanitization(input) {

    const map = {
        // Cyrillic lowercase
        'а': 'a', // Cyrillic small a
        'е': 'e', // Cyrillic small e
        'о': 'o', // Cyrillic small o
        'р': 'p', // Cyrillic small er
        'с': 'c', // Cyrillic small es
        'у': 'y', // Cyrillic small u
        'х': 'x', // Cyrillic small ha
        'і': 'i', // Cyrillic small i (U+0456)
        'ѕ': 's', // Cyrillic small dze (U+0455)

        // Cyrillic uppercase
        'А': 'A', // Cyrillic capital A
        'Е': 'E', // Cyrillic capital E
        'О': 'O', // Cyrillic capital O
        'Р': 'P', // Cyrillic capital Er
        'С': 'C', // Cyrillic capital Es
        'У': 'Y', // Cyrillic capital U
        'Х': 'X', // Cyrillic capital Ha
        'І': 'I', // Cyrillic capital I (U+0406)
        'Ѕ': 'S', // Cyrillic capital Dze (U+0405)

        // Greek uppercase
        'Α': 'A', // Alpha
        'Β': 'B', // Beta
        'Ε': 'E', // Epsilon
        'Ζ': 'Z', // Zeta
        'Η': 'H', // Eta
        'Ι': 'I', // Iota
        'Κ': 'K', // Kappa
        'Μ': 'M', // Mu
        'Ν': 'N', // Nu
        'Ο': 'O', // Omicron
        'Ρ': 'P', // Rho
        'Τ': 'T', // Tau
        'Υ': 'Y', // Upsilon
        'Χ': 'X', // Chi

        // Greek lowercase
        'α': 'a',
        'β': 'b',
        'ε': 'e',
        'ι': 'i',
        'κ': 'k',
        'ο': 'o',
        'ρ': 'p',
        'τ': 't',
        'υ': 'y',
        'χ': 'x',

        // Miscellaneous
        'ⅼ': 'l', // Roman numeral fifty (U+217C) looks like 'l'
    };

    return input.split('').map(ch => map[ch] || ch).join('');
}

module.exports = checkInputSanitization;