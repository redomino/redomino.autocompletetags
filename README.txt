redomino.autocompletetags
=========================

redomino.autocompletetags is a Google+/Facebook like replacement for the Plone keywords widget
*largely* inspired to eea.tags (http://pypi.python.org/pypi/eea.tags, many
thanks to the EEA's guys).

redomino.autocompletewidget achieve the same goal of eea.tags but in a different way:

* provides a generic and reusable AutocompleteKeywordWidget, so you can create one or more new fields powered
  by the autocomplete feature

* perform AJAX queries based on JSON in order to implement the autocomplete feature.
  This is a very important issue when you have to deal with large sites with thousands 
  and thousands of keywords to manage.

* i18n, added support for translation of autocomplete messages


Authors
-------

* Davide Moro, <davide.moro@redomino.com>
