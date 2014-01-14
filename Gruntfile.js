module.exports = function (grunt) {

  var client = 'client';
  var js = client + '/assets/js';

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    clean: [ client + "/assets/js/bower_components", client + "/spec/runner/bower_components"],

    shell: {
      prepareTests: {
        command: './'+client+'/spec/install-runner-dependencies ' + client + '/spec/runner',
        options: {
          stdout: true
        }
      }
    },

    jasmine: {
      run: {
        src: [
          js + '/developer-toolkit.js',
          js + '/controllers/**/*.js'],
        options: {
          keepRunner: true,
          /*vendor: [
            client + '/spec/runner/bower_components/angular/angular.js',
            client + '/spec/runner/bower_components/angular-resource/angular-resource.js',
            client + '/spec/runner/bower_components/angular-route/angular-route.js',
            client + '/spec/runner/bower_components/jquery/jquery.js',
            client + '/spec/runner/bower_components/underscore/underscore.js'
          ],*/
          specs: client + '/spec/specs/**/*-spec.js',
          helpers: client + '/spec/helpers/**/*-helper.js',
          template: client + '/spec/runner/angular-runner.tmpl'

        }
      }
    },

    jshint: {
      all: [
      'Gruntfile.js',
      'client/assets/js/controllers/**/*.js',
      'client/assets/js/directives/**/*.js',
      'server/**/*.js']
    }
  };

  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', []);
  grunt.registerTask('test', [ 'jshint', 'shell:prepareTests', 'jasmine']);

};