module.exports = (grunt) ->

  config =
    pkg: grunt.file.readJSON('package.json')
    clean: ["client/assets/js/components"]

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.registerTask 'default', []

