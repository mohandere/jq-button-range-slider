module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/js/jq-button-range-slider.js" ],
				dest: "dist/js/jq-button-range-slider.js"
			}
		},

		//Concat css files
		concat_css: {
			files: {
				'dist/css/jq-button-range-slider.min.css': [
					'src/css/jq-button-range-slider.css'
				],
			},
		},

		// Lint definitions
		jshint: {
			files: [ "src/js/jq-button-range-slider.js", "test/**/*" ],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [ "dist/js/jq-button-range-slider.js" ],
				dest: "dist/js/jq-button-range-slider.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},


		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: true,
				singleRun: false,
				port: 9999,
				browsers: [ "PhantomJS", "Firefox", "Chrome" ]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				port: 9999,
				browsers: [ "PhantomJS" ]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: [ "src/*", "test/**/*" ],
			tasks: [ "default" ]
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-karma" );

	grunt.registerTask( "travis", [ "jshint", "karma:travis" ] );
	grunt.registerTask( "lint", [ "jshint", "jscs" ] );
	grunt.registerTask( "build", [ "concat", "uglify", "concat_css" ] );
	grunt.registerTask( "default", [ "jshint", "build", "karma:unit:run" ] );
};
