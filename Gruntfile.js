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
      options: {
        executable: true,
        arch: 'x64',
        os: 'linux'
      },
      create: {
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
