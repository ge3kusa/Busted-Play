var BUSTED_PLAY = (function() {

    // Define the properties of our game object
    var game, crafty_game, config = {}, cache = {},
        components, scenes, helpers, assets = {};

    /** =============================================================================

     Module: game

     *  Description: The game object creates the game board and overwrites config object with platform specific values
     *  @module game
     *
     ============================================================================= */

    game = {
        $stage: $("#cr-stage"),
        resize: function() {
            var tw, th;
            tw = window.innerWidth;
            th = window.innerHeight;

            config.width = tw;
            config.height = th;
            config.half_width = tw / 2;
            config.half_height = th / 2;

            game.$stage.css({
                fontSize: (config.width / 400) + 'em',
                lineHeight: (config.width / 300) + 'em'
            });
        }
    };

    /** =============================================================================

     Module: scenes

     *  Description: The scenes object defines static scene variables
     *  @module scenes
     *
     ============================================================================= */

    scenes = {
        LOADING: 'loading',
        MAIN: 'main',
        ABOUT: 'about',
        SINGLE: 'single'
    };

    /** =============================================================================

     Module: components

     *  Description: The components object defines static component variables
     *  @module components
     *
     ============================================================================= */

    components = {};

    /** =============================================================================

     Module: helpers
     *  Description: Helper that contains consolidated, reusable functions
     *  @module helpers
     *
     ============================================================================= */

    helpers = {

        /** =============================================================================

         compile template and data into HTML string

         *  @module helpers
         *  @method compileTemplate
         *  @param options - containing element, template, data
         *  @return {HTML}
         *
         ============================================================================= */

        compileTemplate: function(options) {
            var template = Handlebars.compile($(options.template).html());
            return template(options.data);
        },

        /** =============================================================================

         register Handlebars templates for use of embedded templates

         *  @module helpers
         *  @method registerPartials
         *  @return {Void}
         *
         ============================================================================= */

        registerPartials: function() {

            // register a debug helper in case we're having trouble with templates. call by using {{debug}} or {{debug someValue}}
            Handlebars.registerHelper("debug", function(optValue) {
                console.log("Context");
                console.log("=========");
                console.log(this);

                // if we want to see a particular value
                if (optValue) {
                    console.log("Value");
                    console.log("=========");
                    console.log(optValue);
                }
            });
        }
    };

    /** =============================================================================

     Module: crafty_game

     *  Description: crafty_game object that channels the inner Crafty glory
     *  @module crafty_game
     *
     ============================================================================= */

    crafty_game = {

        /** =============================================================================

         Initialize Crafty

         *  @module crafty_game
         *  @method init
         *  @return {Void}
         *
         ============================================================================= */

        init: function() {

            // initialize Crafty object
            Crafty.init(config.width, config.height);

            // define reusable components
            crafty_game.defineComponent.init();

            // define game scenes
            crafty_game.defineScene.init();

            // register Handlebars helpers
            helpers.registerPartials();

            // invoke loading scene immediately
            crafty_game.invokeScene.loading();
        },

        /** =============================================================================

         Module: defineComponent

         *  Description: Define components
         *  @module crafty_game
         *
         ============================================================================= */

        defineComponent: {
            /** =============================================================================

             Init function that loops the scenes object and defines each scene

             *  @module defineComponent
             *  @method init
             *  @return {Void}
             *
             ============================================================================= */

            init: function() {

                var i, hasOwn = Object.prototype.hasOwnProperty;

                // loop components object and define each component
                for (i in components) {
                    if (hasOwn.call(components, i)) {

                        // define component
                        crafty_game.defineComponent[components[i]]();
                    }
                }
            }
        },

        /** =============================================================================

         Module: defineScene

         *  Description: Define scenes module
         *  @module crafty_game
         *
         ============================================================================= */

        defineScene: {

            /** =============================================================================

             Init function that loops the scenes object and defines each scene

             *  @module defineScene
             *  @method init
             *  @return {Void}
             *
             ============================================================================= */

            init: function() {

                var i, hasOwn = Object.prototype.hasOwnProperty;

                // loop scenes object and define each scene
                for (i in scenes) {
                    if (hasOwn.call(scenes, i)) {

                        // define scene
                        crafty_game.defineScene[scenes[i]]();
                    }
                }
            },

            /** =============================================================================

             Define the LOADING scene

             *  @module defineScene
             *  @method loading
             *  @return {Void}
             *
             ============================================================================= */

            loading: function() {
                Crafty.scene("loading", function() {
                    // invoke main scene when loading assets complete
                    crafty_game.invokeScene.main();
                });
            },

            /** =============================================================================

             Define the MAIN scene

             *  @module defineScene
             *  @method main
             *  @return {Void}
             *
             ============================================================================= */

            main: function() {
                Crafty.scene("main", function() {
                    //
                });
            },

            /** =============================================================================

             Define the ABOUT scene

             *  @module defineScene
             *  @method about
             *  @return {Void}
             *
             ============================================================================= */

            about: function() {
                Crafty.scene("about", function() {
                    //
                });
            },

            /** =============================================================================

             Define the SINGLE scene

             *  @module defineScene
             *  @method single
             *  @return {Void}
             *
             ============================================================================= */

            single: function() {
                Crafty.scene("single", function() {
                    //
                });
            }
        },

        /** =============================================================================

         Module: invokeScene

         *  Description: Invoke scenes module
         *  @module crafty_game
         *
         ============================================================================= */

        invokeScene: {

            /** =============================================================================

             Invoke the LOADING scene

             *  @module invokeScene
             *  @method loading
             *  @return {Void}
             *
             ============================================================================= */

            loading: function() {
                console.log("start LOADING scene");
                Crafty.scene(scenes.LOADING);
            },

            /** =============================================================================

             Invoke the MAIN scene

             *  @module invokeScene
             *  @method main
             *  @return {Void}
             *
             ============================================================================= */

            main: function() {
                console.log("start MAIN scene");
                Crafty.scene(scenes.MAIN);
            },

            /** =============================================================================

             Invoke the ABOUT scene

             *  @module invokeScene
             *  @method about
             *  @return {Void}
             *
             ============================================================================= */

            about: function() {
                console.log("start ABOUT scene");
                Crafty.scene(scenes.ABOUT);
            },

            /** =============================================================================

             Invoke the SINGLE scene

             *  @module invokeScene
             *  @method single
             *  @return {Void}
             *
             ============================================================================= */

            single: function() {
                console.log("start SINGLE scene");
                Crafty.scene(scenes.SINGLE);
            }
        }

    };

    return {

        /** =============================================================================

         Init game object

         *  Description: Initialize game
         *  @method init
         *  @return {Void}
         *
         ============================================================================= */

        init: function() {

            // resize game board
            game.resize();

            // initialize Crafty game
            crafty_game.init();
        }
    };

})();