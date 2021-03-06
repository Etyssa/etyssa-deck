# -----------------------------------------------------------------------------
# Author : Edouard Richard                                  <edou4rd@gmail.com>
# -----------------------------------------------------------------------------
# License : GNU General Public License
# -----------------------------------------------------------------------------
PROJECT_NAME = "Seminaire2014"
RM           = rm -fr
MV           = mv -f
DIST_DIR     = "dist/"
TIMESTAMP    = $(shell date "+%Y-%m-%d")
GULP         = gulp
BOWER        = bower
NPM          = npm

.PHONY: all test clean

run:
	$(GULP) serve

clean:
	$(GULP) clean

install:
	$(NPM) install
	$(BOWER) install
	@echo "installed"

freeze: clean
	$(RM) $(DIST_DIR) -r
	$(GULP) build
	@echo "freezed in $(DIST_DIR)"

test:
	$(GULP) protractor:dist

archive: freeze
	@cp -r $(DIST_DIR) $(PROJECT_NAME)-$(TIMESTAMP)
	@tar cvjf "$(PROJECT_NAME)-$(TIMESTAMP).tar.bz2" "$(PROJECT_NAME)-$(TIMESTAMP)"
	@rm -rf $(PROJECT_NAME)-$(TIMESTAMP)
	@echo "archive $(PROJECT_NAME)-$(TIMESTAMP).tar.bz2 created"

# EOF
