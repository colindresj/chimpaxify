module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.map(pkg.licenses) %> */\n\n',
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
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
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
      },
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
    jasmine: {
      options: {
        specs: 'spec/**/.spec.js',
        styles: 'dist/**/*.css'
      },
      jQuery_20: {
        src: 'src/**/*.js',
        options: {
          vendor: ['vendor/jquery/jquery.js', 'vendor/jasmine-jquery/jasmine-jquery.js']
        }
      },
      jQuery_19: {
        src: 'src/**/*.js',
        options: {
          vendor: ['http://code.jquery.com/jquery-1.9.0.js', 'vendor/jasmine-jquery/jasmine-jquery.js']
        }
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test', 'clean', 'concat', 'uglify', 'copy']);

};
