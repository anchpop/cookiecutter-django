# Cookiecutter Django


Powered by [Cookiecutter](https://github.com/audreyr/cookiecutter),
Cookiecutter Django is a framework for jumpstarting production-ready
Django projects quickly. This is a fork made to make it easier to setup
a production-ready React SPA with django.

  - Documentation:
    <https://cookiecutter-django.readthedocs.io/en/latest/>
  - See
    [Troubleshooting](https://cookiecutter-django.readthedocs.io/en/latest/troubleshooting.html)
    for common errors and obstacles
  - If you have problems with this fork of Cookiecutter Django, please open
    [issues](https://github.com/anchpop/cookiecutter-django/issues/new)
    don't send emails to the maintainers.

## Features

  - For Django 2.0 and Python 3.6
  - Supports React with JSX and ES6
  - User interface with [Material-UI](https://material-ui.com/)
  - Code splitting with [Loadable](https://github.com/jamiebuilds/react-loadable)
  - Routing with [React Router](https://github.com/ReactTraining/react-router)
  - State management with [Redux](https://redux.js.org/)
  - Live reloading with [BrowserSync](https://browsersync.io/)
  - Production builds generate PWAs
  - Server-side rendering using a Node render server
  - [12-Factor](http://12factor.net/) based settings via
    [django-environ](https://github.com/joke2k/django-environ)
  - Secure by default. We believe in SSL.
  - Optimized development and production settings
  - Send emails via [Anymail]() (using [Mailgun]() by default, but
    switchable)
  - Media storage using Amazon S3
  - Docker support using [docker-compose]() for development and
    production (using [Caddy]() with [LetsEncrypt]() support)
  - [Procfile]() for deploying to Heroku
  - Instructions for deploying to [PythonAnywhere]()
  - Run tests with unittest or py.test
  - Customizable PostgreSQL version

## Optional Integrations

*These features can be enabled during initial project setup.*

  - Serve static files from Amazon S3 or [Whitenoise]()
  - Configuration for [Celery]() and [Flower]() (the latter in Docker
    setup only)
  - Integration with [MailHog]() for local email testing
  - Integration with [Sentry]() for error logging