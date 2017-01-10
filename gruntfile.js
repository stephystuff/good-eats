'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    clean: ['build/'],

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['node_modules/**']
      },
      source: {
        files: {
          src: ['src/js/**/*.js']
        }
      }
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: 'index.html',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: 'views/**',
            dest: 'build/'
          }
        ]
      },

        images: {
          files: [
            {
              expand: true,
              cwd: 'src/',
              src: 'images/**',
              dest: 'build/'
            }
          ]
        },

        vendorjs: {
          files: [
            {
              expand: true,
              cwd: 'node_modules/angular/',
              src: ['angular.js'],
              dest: 'build/js'
            },
            {
              expand: true,
              cwd: 'node_modules/angular-ui-router/release',
              src: ['angular-ui-router.js'],
              dest: 'build/js'
            }
          ]
        }
      },

      karma: {
        options: {
          frameworks: ['mocha', 'chai'],
          client: {
            mocha: {
              ui: 'bdd'
            }
          },
          browsers: ['PhantomJS'],
          singleRun: true,

          preprocessors: {
            'src/js**/*.js': ['coverage']
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }
        },
        posts: {
          options: {
            files: [
              'node_modules/angular/angular.js',
              'node_modules/angular-ui-router/release/angular-ui-router.js',
              'node_modules/angular-mocks/angular-mocks.js',
              'src/js/good-eats.module.js',
              'src/js/posts.controller.js',
              'src/js/posts.service.js',
              'test/specs/posts.controller.spec.js',
              'test/specs/posts.service.spec.js'
            ]
          }
        }
      },
      sass: {
        allStyles: {
          files: {
            'build/css/styles.css': 'src/sass/main.scss'
          }
        }
      },

      concat: {
        js: {
          src: ['src/js/good-eats.module.js', 'src/js/**/*.js'],
          dest: 'build/js/app.js'
        }
      },

      watch: {
        html: {
          files: ['src/**/*.html'],
          tasks: ['copy:html']
        },
        js: {
          files: ['src/js/**/*.js'],
          tasks: ['test','concat']
        },
        test: {
          files: ['test/specs/**/*.js'],
          tasks: ['test', 'karma']
        },
        sass: {
          files: ['src/sass/**/*.scss'],
          tasks: ['sass']
        },
        images: {
          files: ['src/images/**'],
          tasks: ['copy:images']
        }
      }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint', 'karma']);
    grunt.registerTask('default', [ 'clean', 'test', 'sass', 'copy', 'concat' ]);

};
