module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['spec/**/.spec.js'],
      tasks: ['test']
    },
    jshint: {
      options: {
        ignores: ['lib/**/*.min.js']
      },
      all: ['Gruntfile.js', 'lib/**/*.js', 'spec/**/*.js']
    },
    copy: {
      vendors: {
        files: [
          {
            src: 'bower_components/jquery/jquery.js',
            dest: 'vendor/jquery/jquery.js'
          },
          {
            src: 'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            dest: 'vendor/jasmine-jquery/jasmine-jquery.js'
          }
        ]
      }
    },
    jasmine: {
      src: 'lib/**/*.js',
      options: {
        specs: 'spec/**/.spec.js',
        vendor: ['vendor/jquery/jquery.js', 'vendor/jasmine-jquery/jasmine-jquery.js'],
        styles: 'lib/**/*.css'
      }
    },
    uglify: {
      dist: {
        files: {
          'lib/chimpaxify.min.js': 'lib/chimpaxify.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['jshint', 'copy', 'jasmine']);
  grunt.registerTask('publish', ['default', 'uglify']);

};
