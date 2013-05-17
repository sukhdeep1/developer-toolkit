module.exports = (grunt) ->
  compsDir = 'client/components'
  publicDir = 'client/public'

  # Project configuration.
  config =
    pkg: grunt.file.readJSON('package.json')

    concat:
      options:
        stripBanners: true,
        banner: """/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */"""
      dist:
        src: [
          "#{compsDir}/angular/angular.js",
          "#{compsDir}/angular-resource/angular-resource.js",
          "#{compsDir}/jquery/jquery.js",
          "#{compsDir}/underscore/underscore.js"
        ]
        dest: "#{publicDir}/js/libs.js"

    copy:
      main:
        files: [
          { expand: true, flatten: true, src: ["#{compsDir}/bootstrap.css/**/*.js"], dest: "#{publicDir}/bootstrap/js"},
          { expand: true, flatten: true, src: ["#{compsDir}/bootstrap.css/**/*.css"], dest: "#{publicDir}/bootstrap/css"},
          { expand: true, flatten: true, src: ["#{compsDir}/bootstrap.css/**/*.png"], dest: "#{publicDir}/bootstrap/img"}
        ]

    uglify:
      options:
        banner: """/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n"""
      build:
        files:
          "client/public/js/libs.min.js": ["#{publicDir}/js/libs.js"]

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  # Default task(s).
  grunt.registerTask 'default', ['concat', 'uglify', 'copy']

