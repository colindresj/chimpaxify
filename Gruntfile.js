module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type") %> */\n\n',
    watch: {
      files: ['spec/**/.spec.js', 'src/**/*.js'],
      tasks: ['test']
    },

    clean: {
      files: ['dist']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
    },

    copy: {
      source: {
        files: [
          {
            src: 'src/assets/<%= pkg.name %>.css',
            dest: 'dist/assets/<%= pkg.name %>.css'
          },
          {
            src: 'src/assets/loader.gif',
            dest: 'dist/assets/loader.gif'
          }
        ]
      }
    },

    mocha: {
      options: {
        reporter: 'Spec',
        run: true
      },
      chimp: {
        src: ['tests/**/*.html']
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': '<%= concat.dist.dest %>'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['test', 'clean', 'concat', 'uglify', 'copy']);
};
