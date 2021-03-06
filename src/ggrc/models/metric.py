# Copyright (C) 2018 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Metric model."""

from ggrc import db
from ggrc.access_control.roleable import Roleable
from ggrc.fulltext.mixin import Indexed
from ggrc.models.comment import ScopedCommentable
from ggrc.models import mixins
from ggrc.models.object_document import PublicDocumentable
from ggrc.models.object_person import Personable
from ggrc.models.relationship import Relatable


class Metric(Personable,
             Roleable,
             Relatable,
             PublicDocumentable,
             ScopedCommentable,
             mixins.TestPlanned,
             mixins.LastDeprecatedTimeboxed,
             mixins.CustomAttributable,
             mixins.ScopeObject,
             mixins.base.ContextRBAC,
             mixins.Folderable,
             Indexed,
             db.Model):
  """Representation for Metric model."""
  __tablename__ = 'metrics'
