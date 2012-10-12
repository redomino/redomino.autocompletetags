# Copyright (c) 2011 Redomino srl (http://redomino.com)
# Authors: Davide Moro <davide.moro@redomino.com> and contributors
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 2 as published
# by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
# 02111-1307, USA.

import json

from zope.publisher.browser import BrowserView

from redomino.autocompletetags.config import SELECT_SIZE


class QueryTags(BrowserView):
    """ 
    """

    def __call__(self):
        query = self.request.get('q')
        fieldname = self.request.get('fieldname').split('-')[-1]
        field = self.context.getField(fieldname)
        allowed = [elem for elem in self.context.collectKeywords(fieldname, field.accessor, field.widget.vocab_source)]
        tags = []
        count = 0
        for item in allowed:
            if query.lower() in item.lower():
                tags.append({'id':item, 'name':item})
                count = count + 1
                if count > SELECT_SIZE:
                    break

        self.request.response.setHeader(
            'Content-Type', 'application/json; charset=utf-8')
        return json.dumps(tags)

