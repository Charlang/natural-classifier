module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "google"],
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "comma-dangle": 0,
        "max-len": [
            2,
            {
                "code": 120,
                "tabWidth": 2,
                "ignoreUrls": true
            }
        ],
        "object-curly-spacing": [
            "error",
            "always",
            {
                "objectsInObjects": false,
                "arraysInObjects": false
            }
        ]
    }
}