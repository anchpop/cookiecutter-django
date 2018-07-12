{{cookiecutter.project_name}}
======

An online collaborative image annotation tool

**License**: GPLv3


Settings
--------

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).


Basic Commands
--------------

**Setting up for local development**:

You should have Python (Preferably some virtualenv), yarn, and PostgreSQL installed.  
    
    cd {{cookiecutter.project_slug}}                              # get into our working directory (note: just {{cookiecutter.project_slug}} not {{cookiecutter.project_slug}}/{{cookiecutter.project_slug}})
    pip install -r requirements/local.txt  # install python dependancies
    yarn install                           # install node modules
    createdb {{cookiecutter.project_slug}}                        # create a postgresql database
    python manage.py migrate               # initialize the database



To debug your Javascript using Visual Studio Code, get the (Debugger for Chrome)[https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome] extension, open the project is VSCode, select the {{cookiecutter.project_slug}} configuration and press start.

We use Mailhog for our email backend while developing locally. So:

1. [Download Mailhog for your OS](https://github.com/mailhog/MailHog/releases), 

2. Rename the build to MailHog.

3. Copy the file to the project root (`{{cookiecutter.project_slug}}/`)

4. Make it executable: `chmod +x MailHog`

5. Open another terminal at `{{cookiecutter.project_slug}}/` and run `./MailHog`

6. Test it out at: `http://127.0.0.1:8025/`

(In production we use [MailGun](https://www.mailgun.com/))

**Running locally**: 

Start a development server: `python manage.py runserver`. If Django complains about an incorrect database password, set the `auth-method` in your [`pg_hba.conf`](https://www.postgresql.org/docs/9.1/static/auth-pg-hba-conf.html) to `trust` (It's probably `md5` right now). On Windows and Postgres 10, the default location of this file file is in `C:\Program Files\PostgreSQL\10\data`.

Watch the frontend react files and automatically update when they change: `yarn start <yourapp>`. To make an optimized build for production, use `yarn build <yourapp>`. If you want to build the `{{cookiecutter.project_slug}}` app, just use `yarn start`. To make an optimized production build, use `yarn build`.


**Server Side Rendering**: 

For server-side rendering, we use a NodeJS render server. Make sure you have the latest version of Node. Build the render server with `yarn build-render-server` then run it with `yarn start-render-server`. By default in development server-side rendering is not used, but if you set `REACT.RENDER` to `True` in `config/base.py`, you can test it out. (Note that you must restart the render server every time one of your component's source changes, as Node caches them). 


**Adding new apps**

New apps you create will not work with React out of the box. You must add them to `base.py`'s `REACT_APPS` list, and make sure they have a folder structure similar to `{{cookiecutter.project_slug}}`, with a `src` and `public` folder (`public` should contain an `index_demonstration.html`, a file that is not used but you can look at for educational purposes when writing your templates. For production, I reccomend deleting it from the `static/bundles` folder after it is generated).


Setting Up Your Users
---------------------

* To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

* To create an **superuser account**, use this command::

    $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

Test coverage
-------------

To run the tests, check your test coverage, and generate an HTML coverage report::

    $ coverage run manage.py test
    $ coverage html
    $ open htmlcov/index.html