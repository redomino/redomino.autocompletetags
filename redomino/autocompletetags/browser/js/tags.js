/* Adapted from EEA Tags JS */

jQuery.fn.eeatags = function(options){
  var settings = {};
  return this.each(function(){

    if(options){
      jQuery.extend(settings, options);
    }

    var self = jQuery(this).addClass('eea-tags');
    self.allowNewTokens = false;
    self.wid = 'subject_keywords';

    var new_keywords = jQuery('[id*=keywords]', self);
    if(new_keywords.length){
        self.wid = new_keywords.attr('id');
        self.allowNewTokens = true;
    }

    var existingTags = [];
    var prePopulate = jQuery('select[name*=existing]', self);
    if(prePopulate.length){
      var selected = prePopulate.val();
      jQuery.each(selected !== null ? selected : [], function(index, val){
        if(jQuery.inArray(val, existingTags) === -1){
          existingTags.push(val);
        }
      });
    }else{
      prePopulate = jQuery('input[type=checkbox]:checked', self);
      jQuery.each(prePopulate, function(index){
        var context = jQuery(this);
        var item = context.val();
        if(jQuery.inArray(item, existingTags) === -1){
          existingTags.push(item);
        }
      });
    }

    // Handle new tags
    prePopulate = jQuery('textarea[name*=_keywords]', self);
    if(prePopulate.length){
      prePopulate = prePopulate.val().split('\n');
      jQuery.each(prePopulate, function(index){
        var val = this.trim();
        if(val && jQuery.inArray(val, existingTags) === -1){
          existingTags.push(val);
        }
      });
    }

    self.prePopulate = jQuery.map(existingTags, function(val, idx){
      return {id: val, name: val};
    });

    self.tags = [];
    var tags = jQuery('select[name*=existing]', self);
    if(tags.length){
      jQuery.each(jQuery('option', tags), function(index){
        var context = jQuery(this);
        var item = {id: context.val(), name: context.val()};
        self.tags.push(item);
      });
    }else{
      tags = jQuery('input[type=checkbox]', self);
      jQuery.each(tags, function(index){
        var context = jQuery(this);
        var item = {id: context.val(), name: context.val()};
        self.tags.push(item);
      });
    }

    // Cleanup
    jQuery('[name*=keywords]', self).parent().remove();
    jQuery('#existingTagsSection', self).remove();
    jQuery('#newTagsSection', self).remove();

    // Add new keywords widget
    self.widget = jQuery('<textarea>')
      .attr('rows', '4')
      .attr('id', self.wid)
      .attr('name', self.wid + ":lines").appendTo(self);

    self.noResultsText = self.allowNewTokens ? jQuery('.notFound', self).text() : jQuery('.noResults', self).text();

    self.widget.tokenInput(jQuery('base').attr('href') + "/querytags?fieldname=" + self.attr('id'), {
      theme: 'facebook',
      allowNewTokens: self.allowNewTokens,
      tokenValue: 'name',
      minChars: 2,
      tokenDelimiter: '\n',
      hintText: jQuery('.hintText', self).text(),
      searchingText: jQuery('.searchingText', self).text(),
      noResultsText: self.noResultsText,
      preventDuplicates: true,
      prePopulate: self.prePopulate
    });

  });

};

jQuery(document).ready(function(){
  var widgets = jQuery('.ArchetypesAutocompleteKeywordWidget');
  if(!widgets.length){
    return;
  }

  widgets.eeatags();
});
