module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    clean: {
      archives: '*.nar'
    },
    mochacli: {
      options: {
        ui: 'bdd',
        reporter: 'spec',
        bail: true
      },
      all: ['test/**/*.js']
    },
    nar: {
      linux: {
        options: {
          executable: true,
          arch: 'x64',
          os: 'linux'
        },
        src: 'package.json',
        dest: '.'
      },
      osx: {
        options: {
          executable: true,
          arch: 'x64',
          os: 'darwin'
        },
        src: 'package.json',
        dest: '.'
      }
    }
  })

  grunt.registerTask('test', [
    'mochacli'
  ])

  grunt.registerTask('build', ['clean:archives', 'nar'])
}
