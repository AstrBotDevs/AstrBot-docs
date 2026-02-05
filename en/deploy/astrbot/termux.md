# Deploying AstrBot using Termux

> [!WARNING]
> The method used in this tutorial is only applicable to Android devices. There is no real `Termux` on Apple devices.

>[!TIP]
>In this tutorial, unless otherwise specified, always enter `Y` or `y` for prompts like `Do you want to continue?[Y/n]` (or similar).

# Preparation Steps

## Bash Basics

### Enter a Directory

```bash
cd /path/to/dir
```

### List Directory Contents

```bash
ls
```

### Delete a File or Directory

```bash
rm -r /path/to/dir/or/file
```

### Run a `.sh` (`Shell`) File

```bash
bash xxx.sh
```

## Install `Termux`

On the [Termux Official Website](https://termux.dev/en), you can choose to download Termux from [GitHub](https://github.com/termux/termux-app/releases) or [F-Droid](https://f-droid.org/en/packages/com.termux/).

## Change Repository (Optional)

>[!TIP]
>It is recommended to change the repository for a better installation experience.
>However, changing the repository will not make `git clone` faster.

```bash
termux-change-repo
```

Select the first option `Mirror group Rotate between several mirrors`.

Then select the third option `Mirrors in Chinese Mainland    All in Chinese Mainland` and wait for it to complete.

# Official Deployment

## Install `proot-distro` and Other Required Components

First, install `uv`, `git`, and `proot-distro`.

```bash
pkg install uv git proot-distro
```

### Install `Ubuntu Environment` using `proot-distro`

>[!TIP]
>Accessing `GitHub` from mainland China can be unstable, so using a booster or proxy is recommended.

```bash
proot-distro install ubuntu
```

### Log in to the `Ubuntu Environment`

After downloading and configuration are complete, you will see a prompt `Log in with: proot-distro login ubuntu`. Enter it to log in.

Specifically:

```bash
proot-distro login ubuntu
```

Now you are in the `Ubuntu Environment`, and you need to use `apt` commands to install packages.

## Add Third-Party PPA

>[!TIP]
>`Python 3.10` is not in the official software sources, and the Python version required by `uv` is 3.10. Therefore, this step is necessary.

### Install `software-properties-common` using `apt` (Prerequisite for adding PPA)

<!-- This is not run directly in the Termux base environment because it would cause errors. Also, proot-distro is small and has minimal performance loss. -->

<!-- Installing miniconda or anaconda here causes errors for unknown reasons. -->

```bash
apt update && apt install software-properties-common
```

### Add `deadsnakes` PPA (Maintained by the Python Community)

```bash
add-apt-repository ppa:deadsnakes/ppa && apt update
```

When adding, you may see: `Press [ENTER] to continue or Ctrl-c to cancel.`. Press Enter at this point.

## Install `Python`

After completing the above steps, you can install `Python 3.10`.

```bash
apt install python3.10
```

## Clone the `AstrBot` Repository

At this point, your path should be `~#` and not any other subdirectory, to ensure the project directory can be found easily.

```bash
git clone https://github.com/AstrBotDevs/AstrBot.git && cd AstrBot
```

If everything goes well, you should be in `~/AstrBot#`, and you can proceed to the next step.

>[!NOTE]
>If `git clone` fails, the subsequent `cd` command will not work. Please pay attention to whether the path is correct when running commands.
>
>If you need to run the above command again, it is recommended to first run:
>
>```bash
>rm -r AstrBot
>```
>
>Then run the command again.

## Run `AstrBot`

```bash
uv run main.py
```

>[!TIP]
>If downloading packages with `uv` is slow, you can change the source (using `Tsinghua Mirror` as an example):
>
>```bash
>export UV_DEFAULT_INDEX="https://pypi.tuna.tsinghua.edu.cn/simple"
>```

## Error Solutions

> If you encounter: `[WARN] uv sync failed, retrying 2/3
  × Failed to build astrbot @ file:///root/
  ├─▶ Failed to install requirements from build-system.requires
  ├─▶ Failed to install build dependencies
  ├─▶ Failed to install: trove_classifiers-2025.9.11.17-py3-none-any.whl
  │   (trove-classifiers==2025.9.11.17)
  ╰─▶ failed to hardlink file from
      /root/.cache/uv/archive-v0/10gPuxc61Audvy1Eg6SFz/trove_classifiers/.l2s.__init__.py0001
      to
      /root/.cache/uv/builds-v0/.tmp2lFVJx/lib/python3.10/site-packages/trove_classifiers/.l2s.__init__.py0001:
      Operation not permitted (os error 1)

You can run the following commands first, and then restart:

>```bash
>echo 'export UV_LINK_MODE=copy' >> ~/.bashrc 
>```
>
>```bash
>source ~/.bashrc
>```

## 🎉 Mission Accomplished

If there are no errors, you will see `uv` installing required packages, followed by a message like `WebUI started, accessible at` with several links.

If you see this, congratulations! You have successfully deployed and run `AstrBot`.

Next, you can try accessing [localhost:6185](http://localhost:6185) to verify its availability.

>[!TIP]
>`Termux` shares the same network with the host device. That is, the IP address of `Termux` is the IP address of the host. You can also use `ifconfig` to check the host IP.
>
> The default username and password are `astrbot` and `astrbot`.

# Afterword

## Exit

To exit the `proot-distro` environment, use:

```bash
exit
```

## Restart

Every time you re-enter `Termux`, you need to reopen the `proot` environment and start `AstrBot`.

You can use the following commands:

```bash
proot-distro login ubuntu
cd AstrBot && uv run main.py
```

## Run in Background

### Start

If you need to run multiple processes (e.g., `AstrBot` and `Napcat`) in one session, you can use:

```bash
uv run main.py &
......
```

### Stop

After running the above, you will see an output like `[1] 1145`. To stop the process, use:

```bash
kill -9 1145
```

Or:

```bash
pkill -9 -f "uv run main.py"
```

<!--↑ This one is not very reliable -->

>[!TIP]
>You can also use the `screen` command, which is easier to control than `&`.
>
>```bash
>apt install screen         # Install screen
>screen -S <name>           # Create a new session
>screen -r <name>           # Reconnect to a session
>screen -ls                 # List sessions
>screen -X -S <name> quit   # Close a session
>Ctrl + a + d               # Detach from current window
>```

>[!WARNING]
> When exiting, please make sure to save your tasks to prevent data loss.

## Keeping Alive in Background

To keep the server alive in the background, you can change `Termux` to `Manual Management` in `Settings` -> `Apps & Services` -> `App Launch Management` -> `Termux`, and enable `Allow Background Activity` (or similar options).

Next, you need to deploy any messaging platform to be able to use AstrBot on that platform.

## Termux Deployment Error Solution

If you see `[WARN] uv sync failed, retrying 2/3`:

```bash
× Failed to build astrbot @ file:///root/
├─▶ Failed to install requirements from build-system.requires
├─▶ Failed to install build dependencies
├─▶ Failed to install: trove_classifiers-2025.9.11.17-py3-none-any.whl
│   (trove-classifiers==2025.9.11.17)
╰─▶ failed to hardlink file from
    /root/.cache/uv/archive-v0/10gPuxc61Audvy1Eg6SFz/trove_classifiers/.l2s.__init__.py0001
    to
    /root/.cache/uv/builds-v0/.tmp2lFVJx/lib/python3.10/site-packages/trove_classifiers/.l2s.__init__.py0001:
    Operation not permitted (os error 1)
```

Run the following commands first, and then restart:

```bash
echo 'export UV_LINK_MODE=copy' >> ~/.bashrc 
source ~/.bashrc
```
