from Products.Archetypes.Widget import KeywordWidget
from Products.Archetypes.Registry import registerWidget


class AutocompleteKeywordWidget(KeywordWidget):
    _properties = KeywordWidget._properties.copy()
    _properties.update({
        'macro' : "autocompletekeyword",
        'helper_js': ('++resource++redomino.autocompletetags.js',),
        'helper_css': ('++resource++redomino.autocompletetags.css',),
        })


registerWidget(AutocompleteKeywordWidget,
               title='Autocomplete Keyword',
               description='Renders a HTML widget for choosing keywords',
               used_for=('Products.Archetypes.Field.LinesField',)
               )
