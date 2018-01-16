module.exports = function (grunt) {
    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false
            }
        },
        "babel": {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dist: {
                files: {
                    "dist/js/bs4-dialog-old.js": "dist/js/bs4-dialog-old.js",
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/js/',
                    src: 'bs4-dialog.js',
                    dest: './dist/js/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        return dest + src.replace('.js', '-old.js');
                    }
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['copy', 'babel']);


};