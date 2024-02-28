class DatabaseRouter:
    """
    This router is responsible for determining the database to use for read and write operations
    based on the app label of the model being accessed.

    Methods:
    - db_for_read(model, **hints): Returns the database alias to use for read operations.
    - db_for_write(model, **hints): Returns the database alias to use for write operations.

    Note: This router assumes the existence of two databases: 'default' and 'slave'.
    """

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'users':
            return 'slave'
        return 'default'

    def db_for_write(self, model, **hints):
        return 'default'
