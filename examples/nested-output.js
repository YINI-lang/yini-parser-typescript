// Parsed output in config from examples/nested.yini using YINI.parseFile(...)

config = {
    App: {
        name: 'Nested Demo App',
        version: '1.2.3',
        Theme: {
            primaryColor: 3368601,
            darkMode: true,
            Overrides: { darkMode: false, fontSize: 14 },
        },
    },
    Database: {
        host: 'db.local',
        port: 5432,
        Credentials: { password: 'secret' },
    },
}
