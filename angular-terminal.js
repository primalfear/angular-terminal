(function(angular) {
    var module = angular.module('angular-terminal', []);

    function angularTerminal($rootScope) {
        return {
            restrict: 'A',
            scope: {
                commands: "=" //Allow commands to be past through
            },
            link: function(scope, element, attrs) {
                console.log(scope.commands);

                // define namespace
                var namespace = 'terminal.' + (attrs.angularTerminal || 'default');
                var onInput;
                if (scope.commands) {
                    onInput = scope.commands;
                } else {
                    onInput = function(input, terminal) {
                        // user input commands
                        $rootScope.$emit(namespace, input, terminal);
                    };
                }
                // initialize terminal object
                var t = element.terminal(onInput,
                    {
                        greetings: attrs.greetings || "",
                        prompt: attrs.prompt || ""
                    });

                $rootScope.$on(namespace + '.echo',
                    function(e, msg) {
                        t.echo(msg);
                    });
            }
        };

    };

    module.directive('angularTerminal', angularTerminal);
})(angular);