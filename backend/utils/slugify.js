const slugify = require('slugify');

const slug = (text) => {
    return slugify(text, {
        lower: true,
        strict: true,
    })
}

module.exports = {slug};