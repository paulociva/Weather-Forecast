module.exports = {
    displayName: 'weather-utils',
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    coverageDirectory: '../../../coverage/libs/weather/utils',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
};
