module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ["Gruntfile.js", "lib/**/*.js", "spec/**/*.js"]
    },
    jasmine: {
      src: "lib/**/*.js",
      options: {
        specs: "spec/.spec.js",
        vendor: "vendor/**/*.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test']);

};
