from Products.Five.browser import BrowserView
from zope.app.pagetemplate.viewpagetemplatefile import ViewPageTemplateFile

class AutocompleteMacroView(BrowserView):

    template = ViewPageTemplateFile('templates/autocompletekeyword.pt')

    __call__ = template

    def __getitem__(self, key):
        return self.template.macros[key]

    @property
    def macros(self):
        return self.template.macros

